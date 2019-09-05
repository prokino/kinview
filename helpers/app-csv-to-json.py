import csv, json

def main():
    csvPath = '/home/saber/workspace/kinview-react/src/data/classification_july1_hasAln.csv'
    jsonPath = '/home/saber/workspace/kinview-react/src/data/classification.json'

    data = []
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        for rows in csvreader:
            group = rows['Group']
            family = rows['Family']
            subfamily = rows['Subfamily']
            hasalignment = rows['HasAlignment']
            entity = {'value': group}
            if (entity not in data):
                data.append(entity)
        for rows in csvreader:
            group = rows['Group']
            family = rows['Family']
            entity = data[group]
            subfamily = rows['Subfamily']
            hasalignment = rows['HasAlignment']
            entity = {'value': family}
            if (entity not in data):
                data.append(entity)
    
    print(data)
    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(data, indent=4))

if __name__ == "__main__":
    main()