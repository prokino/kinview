import csv, json
from treestruct import Tree

def main():
    csvPath = 'src/data/classification_july1_hasAln.csv'
    jsonPath = '/home/saber/workspace/kinview-react/src/data/classification.json'

    tree = Tree()
    tree.create_node("ePKF") #root

    data = []
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        for rows in csvreader:
            group = rows['Group']
            family = rows['Family']
            subfamily = rows['Subfamily']
            hasalignment = rows['HasAlignment']
            if tree[group] is None:
                tree.create_node(group)
            if family != '' and not family in tree[group].fpointer:
                tree.create_node(family,parent=group)

    print(tree)
    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(data, indent=4))

if __name__ == "__main__":
    main()