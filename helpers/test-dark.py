import csv
darkPath = 'src/data/dark_kinase_list_curated.csv'
csvPath = 'src/data/KinaseTree.csv'

dark_list = []
with open(darkPath) as f:
    csvreader = csv.DictReader(f, fieldnames=['gene','uniprotId'])
    for row in csvreader:
        dark_list.append(row['uniprotId'].split('-')[1])

print(len(dark_list))

tree_list = []
with open(csvPath) as f2:
    csvreader = csv.DictReader(f2)
    for row in csvreader:
        if row['UniProt']:
            tree_list.append(row['UniProt'])
print(len(tree_list))

cnt = 0
for r in dark_list:
    if r in tree_list:
        cnt+=1
print(cnt)