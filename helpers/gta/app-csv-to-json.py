import csv, json

csvPath = 'src/gta/data/GTA_Tree.csv'
jsonPath = 'src/gta/data/classification.json'
root_name = "GTA"

def getvalue(s):
    return s.split('@')[1]

#removes space parantheses. For example, return DMPK1 in 'DMPK1 (DMPK)'
def fixProtein(p):
    #return p.split(" ")[0]
    return p # decided to show name with synonym

def classification_csv_to_json():
    def create_entity(entity_type,value,row):
        entity = None
        if entity_type == "clade":
            entity ={'id': "id" + str(idx) + "@" + value, 
                    'type' : entity_type,
                    'value':value,
                    'SeqNR':row['SeqNR'],
                    'SeqUniProt':row['SeqUniProt'],
                    'path': row['Weblogo'][:-4], 
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "family":
            entity = {'id':"id" + str(idx) + "@" + value, 
                    'type' : entity_type,
                    'value':value,
                    'SeqNR':row['SeqNR'],
                    'SeqUniProt':row['SeqUniProt'],
                    #'protein':fixProtein(row['Protein']), 
                    'path': row['Weblogo'][:-4],
                    'members':row['Members'].split(";"),
                    'nodes': []}
        elif entity_type == "subfamily":
            entity ={'id':"id" + str(idx) + "@" + value,
                    'type' : entity_type,
                    'value': value,
                    'SeqNR':row['SeqNR'],
                    'SeqUniProt':row['SeqUniProt'],
                    'members':row['Members'].split(";"),
                    'path':row['Weblogo'][:-4],
                    'nodes':[]
                    #'path':"{0}_{1}_{2}".format(clade['value'],family['value'],subfamily),
                    #'HasAlignment': row['HasAlignment'] 
                    }

        else:
            ValueError(entity_type)
        return entity

    clades = []
    interested_rows = []
    root = None #the first line
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        root = next(csvreader) #ignore the first clade for now, because we don't need it in the treeview hierarchy, we'll use it later
        for row in csvreader:
            if row["Weblogo"] == root_name + ".png":
                break
            interested_rows.append(row)

    #Clade
    idx = 0
    for row in interested_rows:
        idx += 1
        clade = row['Clade']
        if not any(g['value'] == clade for g in clades): #if clade not already added to the clades
            entity = create_entity("clade",clade,row)
            clades.append(entity)
        
    #Family
    idx = 0
    for row in interested_rows:
        idx += 1
        family = row['Family']
        if family != '': #and not family in clade.nodes:
            clade = next(x for x in clades if x['value'] == row['Clade']) #find the first (and the only) clade having the clade name
            if not any(x for x in clade['nodes'] if x['value'] == family): #in clade['nodes']['text']:
                entity = create_entity("family",family,row)
                clade['nodes'].append(entity)
                
    #Subfamily
    idx = 0
    for row in interested_rows:
        idx += 1
        subfamily = row['Subfamily']
        if subfamily != '':
            clade = next(x for x in clades if x['value'] == row['Clade'])
            if any(x for x in clade['nodes'] if x['value'] == row['Family']):
                family = next(x for x in clade['nodes'] if x['value'] == row['Family'])
            if not any(x for x in family['nodes'] if x['value'] == subfamily):
                entity = create_entity("subfamily",subfamily,row)
                family['nodes'].append(entity)
  
    # add one row for all to the beginning of the file
    clades.insert(0, {
        "id": "id@" + root_name,
        "value": root_name,
        "path": root_name,
        'SeqNR':root['SeqNR'],
        'SeqUniProt':root['SeqUniProt'],
        "members": root['Members'].split(";"),
        "nodes": [],
    })
    return clades

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

    prettyjson(cols,jsonPath)
    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(cols, indent=2))

    print("Numbering {0} created.".format(jsonPath))


if __name__ == "__main__":
    gta = classification_csv_to_json()
    write_classification(gta)
    #numbering_csv_to_json()
