import csv, json
#from treestruct import Tree
def getvalue(s):
    return s.split('@')[1]
def classification_csv_to_json():
    #csvPath = 'src/data/classification_july1_hasAln.csv'
    csvPath = 'src/data/KinaseTree.csv'
    jsonPath = 'src/data/classification.json'
    data = {}
    groups = []

    #Group
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        idx = 0
        for row in csvreader:
            idx += 1
            group = row['Group']
            if not any(g['value'] == group for g in groups): #if group not already added to the groups
                groups.append({'id': "id" + str(idx) + "@" + group, 'value':group,'protein':row['Protein'], 'path': row['WebLogo'], 'nodes': []})
            
        #data = groups
    
    #Family
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        idx = 0
        for row in csvreader:
            idx += 1
            family = row['Family']
            if family != '': #and not family in group.nodes:
                group = next(x for x in groups if x['value'] == row['Group']) #find the first (and the only) group having the group name
                if not any(x for x in group['nodes'] if x['value'] == family): #in group['nodes']['text']:
                    entity = {'id':"id" + str(idx) + "@" + family, 'value':family,'protein':row['Protein'], 'path': row['WebLogo'],'nodes': []}
                    group['nodes'].append(entity)
                
    #Subfamily
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        idx = 0
        for row in csvreader:
            idx += 1
            subfamily = row['Subfamily']
            if subfamily != '':
                group = next(x for x in groups if x['value'] == row['Group'])
                family = next(x for x in group['nodes'] if x['value'] == row['Family'])
                family['nodes'].append({'id':"id" + str(idx) + "@" + subfamily,
                                        'value': subfamily,
                                        'protein':row['Protein'],
                                        'path':row['WebLogo']
                                        #'path':"{0}_{1}_{2}".format(group['value'],family['value'],subfamily),
                                        #'HasAlignment': row['HasAlignment'] 

                                        })
    
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(groups, indent=4))
        print("{0} created.".format(jsonPath))

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
        idx = 0
       # next(csvreader) #skip the header
        for row in csvreader:
            idx += 1
            for protein in cols:
                cols.setdefault(protein,[]).append(row[protein])

    prettyjson()
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(cols, indent=2))

    print("{0} created.".format(jsonPath))
def prettyjson():

with open(infile) as f_read:
    for line in f_read:
        line = line.strip()
        if len(line) > 0:
            try:
                elem = json.loads(line)
                elem.pop(key_to_remove, None)

                outfile = '{}.json'.format(elem['name'])      # this may raise KeyError
                with open(outfile, 'w') as f_write:
                    f_write.write('{}\n'.format(json.dumps(elem)))
            except json.JSONDecodeError:
                pass

if __name__ == "__main__":
    #classification_csv_to_json()
    numbering_csv_to_json()