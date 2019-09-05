import csv, json

def main():
    csvPath = '../src/data/classification_july1_hasAln.csv'
    jsonPath = '../src/data/classification.json'

    data = {}
    with open(csvPath) as f:
        csvreader = csv.DictReader(f)
        for rows in csvreader:
            id = rows['id']
            data[id] = rows
    
    # with open(jsonPath, 'w') as f:
    #     f.write(json.dumps(data, indent=4))

if __name__ == "__main__":
    main()