import csv, json
#from treestruct import Tree

def main():
    csvPath = 'src/data/classification_july1_hasAln.csv'
    jsonPath = 'src/data/classification.json'
    data = {}
    groups = []

    #Group
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        
        for row in csvreader:
            group = row['Group']
            if not any(g['value'] == group for g in groups): #if group not already added to the groups
                groups.append({'value':group, 'nodes': []})
            
        #data = groups
    
    #Family
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        for row in csvreader:
            family = row['Family']
            if family != '': #and not family in group.nodes:
                group = next(x for x in groups if x['value'] == row['Group']) #find the first (and the only) group having the group name
                entity = {'value':family, 'nodes': []}
                if not entity in group['nodes']:
                    group['nodes'].append(entity)
                
    #Subfamily
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        for row in csvreader:
            subfamily = row['Subfamily']
            if subfamily != '':
                group = next(x for x in groups if x['value'] == row['Group'])
                family = next(x for x in group['nodes'] if x['value'] == row['Family'])
                family['nodes'].append({'value':subfamily,'path':"{0}/{1}/{2}".format(group['value'],family['value'],subfamily), 'nodes': []})
    
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(groups, indent=4))
        print("{0} created.".format(jsonPath))

    # tree = Tree()
    # tree.create_node("ePKF") #root

    # data = []
    # with open(csvPath) as f:
    #     csvreader = csv.DictReader(f)
    #     for row in csvreader:
    #         group = row['Group']
    #         family = row['Family']
    #         subfamily = row['Subfamily']
    #         hasalignment = row['HasAlignment']
    #         if tree[group] is None:
    #             tree.create_node(group)
    #         if family != '' and not family in tree[group].fpointer:
    #             tree.create_node(family,parent=group)

    
    # for node in tree.nodes:
    #     if not node.name in data:
    #         entity = {'value': node.name}
    #         if len(node.fpointer)>0:
    #             entity["nodes"] = node.fpointer
    #             for child3 in node.fpointer:
    #                 print(type(child3))
    #                 #entity["nodes"][child3]["nodes"] = child3.fpointer
    #         data.append(entity)

    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(data, indent=4))
    # print("{0} created.".format(jsonPath))

if __name__ == "__main__":
    main()