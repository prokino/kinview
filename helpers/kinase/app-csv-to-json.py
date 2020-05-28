import csv, json
#from treestruct import Tree

csvPath = 'src/kinase/data/KinaseTree.csv'
jsonPath = 'src/kinase/data/classification.json'
darkPath = 'src/kinase/data/dark_kinase_list_curated.csv'

def getvalue(s):
    return s.split('@')[1]

#removes space parantheses. For example, return DMPK1 in 'DMPK1 (DMPK)'
def fixProtein(p):
    #return p.split(" ")[0]
    return p # decided to show name with synonym

def classification_csv_to_json(root_name):
    def create_entity(entity_type,value,row):
        entity = None
        if entity_type == "group":
            entity ={'id': "id" + str(idx) + "@" + value, 
                    'uniprot' : row['UniProt'],
                    'type' : entity_type,
                    'value':value,
                    'aligend_seq':row['Aligned_Seq'],
                    'ortholog_seq':row['Ortholog_Seq'],
                    'path': row['WebLogo'][:-4], 
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "family":
            entity = {'id':"id" + str(idx) + "@" + value, 
                    'uniprot' : row['UniProt'],
                    'type' : entity_type,
                    'value':value,
                    'aligend_seq':row['Aligned_Seq'],
                    'ortholog_seq':row['Ortholog_Seq'],
                    #'protein':fixProtein(row['Protein']), 
                    'path': row['WebLogo'][:-4],
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "subfamily":
            entity ={'id':"id" + str(idx) + "@" + value,
                    'uniprot' : row['UniProt'],
                    'type' : entity_type,
                    'value': value,
                    'aligend_seq':row['Aligned_Seq'],
                    'ortholog_seq':row['Ortholog_Seq'],
                    'members':row['Members'].split(";"),
                    'path':row['WebLogo'][:-4],
                    'nodes':[]
                    #'path':"{0}_{1}_{2}".format(group['value'],family['value'],subfamily),
                    #'HasAlignment': row['HasAlignment'] 
                    }
        elif entity_type == "protein":
            entity ={'id':"id" + str(idx) + "@" + value,
                    'uniprot' : row['UniProt'],
                    'type' : entity_type,
                    'value': fixProtein(value),
                    'aligend_seq':row['Aligned_Seq'],
                    'ortholog_seq':row['Ortholog_Seq'],
                    'isDark': row['UniProt'] in dark_list,
                    'members':row['Members'].split(";"),
                    'path':row['WebLogo'][:-4] # remove extension
                    }
        else:
            ValueError(entity_type)
        return entity

    #csvPath = 'src/data/classification_july1_hasAln.csv'
    
    dark_list = []
    with open(darkPath) as f:
        csvreader = csv.DictReader(f, fieldnames=['gene','uniprotId'])
        for row in csvreader:
            dark_list.append(row['uniprotId'].split('-')[1]) #original id: UniProt-O00418

    groups = []
    interested_rows = []
    root = None #the first line
    #Filter CSV file, so we will have distinct Group, Family, and Subfamily rows
    if root_name == "PK":
        with open(csvPath) as f:
            csvreader = csv.DictReader(f)
            root = next(csvreader) #ignore the first group for now, because we don't need it in the treeview hierarchy, we'll use it later
            for row in csvreader:
                #if not any(r['Group'] == row['Group'] and r['Family'] == row['Family'] and r['Subfamily'] == row['Subfamily'] for r in interested_rows): 
                if row["WebLogo"] == "PKL.png":
                    break
                interested_rows.append(row)
    elif root_name == "PKL":
        with open(csvPath) as f:
            csvreader = csv.DictReader(f)
            pk = next(csvreader) #ignore the first group for now, because we don't need it in the treeview hierarchy, we'll use it later
            start = False
            for row in csvreader:
                if start:
                    interested_rows.append(row)
                elif row["WebLogo"] == "PKL.png":
                    root = row
                    start = True

    #Group
    idx = 0
    for row in interested_rows:
        idx += 1
        group = row['Group']
        if not any(g['value'] == group for g in groups): #if group not already added to the groups
            entity = create_entity("group",group,row)
            groups.append(entity)
        
    #Family
    idx = 0
    for row in interested_rows:
        idx += 1
        family = row['Family']
        if family != '': #and not family in group.nodes:
            group = next(x for x in groups if x['value'] == row['Group']) #find the first (and the only) group having the group name
            if not any(x for x in group['nodes'] if x['value'] == family): #in group['nodes']['text']:
                entity = create_entity("family",family,row)
                group['nodes'].append(entity)
                
    #Subfamily
    idx = 0
    for row in interested_rows:
        idx += 1
        subfamily = row['Subfamily']
        if subfamily != '':
            group = next(x for x in groups if x['value'] == row['Group'])
            family = next(x for x in group['nodes'] if x['value'] == row['Family'])
            if not any(x for x in family['nodes'] if x['value'] == subfamily):
                entity = create_entity("subfamily",subfamily,row)
                family['nodes'].append(entity)
    # Protein
    idx = 0
    for row in interested_rows:
        idx +=1
        protein = row['Protein']
        if protein!= '':
            group = next(x for x in groups if x['value'] == row['Group'])
            
            family = None
            try:
                family = next(x for x in group['nodes'] if x['value'] == row['Family'])
            except StopIteration:
                pass
            
            subfamily = None
            if family:
                try:
                    subfamily = next(x for x in family['nodes'] if x['value'] == row['Subfamily'])
                except StopIteration:
                    pass

            entity = create_entity("protein",protein,row)
            # A protein's parent might be a subfamily, or a family
            if subfamily and not any(x for x in subfamily['nodes'] if x['value'] == protein):
                subfamily['nodes'].append(entity)
            elif family and not any(x for x in family['nodes'] if x['value'] == protein):
                family['nodes'].append(entity)
            #elif group and not any(x for x in group['nodes'] if x['value'] == protein):
            else:
                group['nodes'].append(entity)

    # add one row for all to the beginning of the file
    groups.insert(0, {
        "id": "id@" + root_name,
        "value": root_name,
        "protein":root['Protein'],
        "path": root_name,
        'aligend_seq':root['Aligned_Seq'],
        'ortholog_seq':root['Ortholog_Seq'],
        "members": root['Members'].split(";"),
        "nodes": [],
    })
    return groups

def write_classification(data):
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(data, indent=4))
        print("Classification {0} created.".format(jsonPath))

def prettyjson(cols,jsonPath):
    all_json="{"
    for prot in cols:
        elem = json.loads("{\"" + prot + "\":" + json.dumps(cols[prot])+"}")
        all_json += '{},\n'.format(json.dumps(elem)).replace("{","").replace("}","")
    
    with open(jsonPath, 'w') as f_write:
        f_write.write(all_json[:-2] + "}")

def numbering_csv_to_json():
    csvPath = 'src/data/KinView_Numbering.csv'
    jsonPath = 'src/data/numbering.json'
    cols = dict()
    
    #Build Columns
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        row = next(csvreader)
        for col in row:
            cols.update({col:[]})
        #cols = cols[1:] 
        del cols['Align_Position'] #Remove the first column (alignment)

    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
    #    idx = 0
       # next(csvreader) #skip the header
        for row in csvreader:
    #        idx += 1
            for protein in cols:
                cols.setdefault(protein,[]).append(None if not row[protein] else int(row[protein]))
   #remove parantheses from protein names
    newcols={}
    for col in cols:
        newcols[fixProtein(col)] = cols[col]
    prettyjson(newcols,jsonPath)
    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(cols, indent=2))

    print("Numbering {0} created.".format(jsonPath))

def dark_csv_to_json():
    
    fieldnames = ("value","uniprotId")
    data=[]
    with open('src/kinase/data/dark_kinase_list_curated.csv', 'r') as f:
        reader = csv.DictReader(f, fieldnames)
        for rows in reader:
            data.append({'uniprotId':rows["uniprotId"],'value':rows["value"].split("_")[1]})
            # data['value'] = rows["value"]
            # data['uniprotId'] = rows["uniprotId"]

    data = sorted(data, key=lambda k: k['value'], reverse=False)
    with open('src/kinase/data/dark_list.json', 'w') as jsonfile:
        jsonfile.write(json.dumps(data,indent=4))

if __name__ == "__main__":
    pk = classification_csv_to_json("PK")
    pkl = classification_csv_to_json("PKL")
    merged = [pk,pkl]
    write_classification(merged)
    #numbering_csv_to_json()
    #dark_csv_to_json()