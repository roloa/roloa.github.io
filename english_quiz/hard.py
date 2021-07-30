
import csv
import json
import re

out_json = []


with open("./source_dic.csv", "r", encoding="utf-8", errors="", newline="" ) as csv_file:

    csv_list = csv.reader(csv_file, delimiter=",", doublequote=True, lineterminator="\r\n", quotechar='"', skipinitialspace=True)


    count = 1

    for row in csv_list:
        print(row)

        if len(row[0]) <= 6:
            continue;
        if int(row[1]) < 5000:
            continue;
        if 100000 < int(row[1]):
            continue;
        if re.search('[A-Z]', row[0]):
            continue;
        if re.search('[ア-ン]', row[3]):
            continue;

        new_word = {
            "en":row[0],
            "jp":row[3],
            "description":row[4]
        }
        out_json.append(new_word)
        count += 1
        if 100000 < count:
            break

with open('hard.json', mode='wt', encoding='utf-8') as file:
  json.dump(out_json, file, ensure_ascii=False, indent=2)
