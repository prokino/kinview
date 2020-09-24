import csv, json, os
#Subgroup,Family,Subfamily,Members

path, filename = os.path.split(os.path.realpath(__file__))
appname = path.split("/")[-1]

csvPath = f'src/{appname}/data/tree.csv'
jsonPath = f'src/{appname}/data/classification.json'
root_name = "FPVR"

def getvalue(s):
    return s.split('@')[1]

#removes space parantheses. For example, return DMPK1 in 'DMPK1 (DMPK)'
def fixProtein(p):
    #return p.split(" ")[0]
    return p # decided to show name with synonym

def classification_csv_to_json():
    def create_entity(entity_type,value,row):
        entity = None
        if entity_type == "subgroup":
            entity ={'id': "id" + str(idx) + "@" + value, 
                    'type' : entity_type,
                    'value':value,
                    'path': row['Weblogo'][:-4] if 'Weblogo' in row else value, 
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "family":
            entity = {'id':"id" + str(idx) + "@" + value, 
                    'type' : entity_type,
                    'value':value,
                    'path': row['Weblogo'][:-4] if 'Weblogo' in row else value, 
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "subfamily":
            entity ={'id':"id" + str(idx) + "@" + value,
                    'type' : entity_type,
                    'value': value,
                    'members':row['Members'].split(";"),
                    'path':row['Weblogo'][:-4] if 'Weblogo' in row else value, 
                    'nodes':[]
                    }

        else:
            ValueError(entity_type)
        return entity

    subgroups = []
    interested_rows = []
    root = None #the first line
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        root = next(csvreader) #ignore the first subgroup for now, because we don't need it in the treeview hierarchy, we'll use it later
        for row in csvreader:
            # if ('Weblogo' in row and row["Weblogo"] == root_name + ".png") or ():
            #     break
            interested_rows.append(row)

    #Subgroup
    idx = 0
    for row in interested_rows:
        idx += 1
        subgroup = row['Subgroup']
        if not any(g['value'] == subgroup for g in subgroups): #if subgroup not already added to the subgroups
            entity = create_entity("subgroup",subgroup,row)
            subgroups.append(entity)
        
    #Family
    idx = 0
    for row in interested_rows:
        idx += 1
        family = row['Family']
        if family != '': #and not family in subgroup.nodes:
            subgroup = next(x for x in subgroups if x['value'] == row['Subgroup']) #find the first (and the only) subgroup having the subgroup name
            if not any(x for x in subgroup['nodes'] if x['value'] == family): #in subgroup['nodes']['text']:
                entity = create_entity("family",family,row)
                subgroup['nodes'].append(entity)
                
    #Subfamily
    idx = 0
    for row in interested_rows:
        idx += 1
        subfamily = row['Subfamily']
        if subfamily != '':
            subgroup = next(x for x in subgroups if x['value'] == row['Subgroup'])
            if any(x for x in subgroup['nodes'] if x['value'] == row['Family']):
                family = next(x for x in subgroup['nodes'] if x['value'] == row['Family'])
            if not any(x for x in family['nodes'] if x['value'] == subfamily):
                entity = create_entity("subfamily",subfamily,row)
                family['nodes'].append(entity)
  
    # add one row for all to the beginning of the file
    # subgroups.insert(0, {
    #     "id": "id@" + root_name,
    #     "value": root_name,
    #     "path": root_name,
    #     "members": root['Members'].split(";"),
    #     "nodes": [],
    # })
    return subgroups

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
    csvPath = f'src/{appname}/data/numbering.csv'
    jsonPath = f'src/{appname}/data/numbering.json'
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
        for row in csvreader:
            for el in cols:
                cols.setdefault(el,[]).append(None if not row[el] else int(row[el]))
    prettyjson(cols,jsonPath)
    print("Numbering {0} created.".format(jsonPath))


if __name__ == "__main__":
    cl = classification_csv_to_json()
    write_classification(cl)
    numbering_csv_to_json()
