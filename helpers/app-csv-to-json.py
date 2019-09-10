import csv, json
#from treestruct import Tree
def getvalue(s):
    return s.split('@')[1]
def main():
    csvPath = 'src/data/classification_july1_hasAln.csv'
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
                groups.append({'id': "id" + str(idx) + "@" + group, 'value':group, 'HasAlignment': row['HasAlignment'], 'nodes': []})
            
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
                    entity = {'id':"id" + str(idx) + "@" + family, 'value':family, 'HasAlignment': row['HasAlignment'],'nodes': []}
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
                                        'path':"{0}_{1}_{2}".format(group['value'],family['value'],subfamily),
                                        'HasAlignment': row['HasAlignment'] })
    
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(groups, indent=4))
        print("{0} created.".format(jsonPath))


if __name__ == "__main__":
    main()