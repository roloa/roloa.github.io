
import csv
import json

out_json = []


with open("./source_dic.csv", "r", encoding="utf-8", errors="", newline="" ) as csv_file:

    csv_list = csv.reader(csv_file, delimiter=",", doublequote=True, lineterminator="\r\n", quotechar='"', skipinitialspace=True)


    count = 1

    for row in csv_list:
        print(row)
        if int(row[1]) < 1000:
            new_word = {
                "en":row[0],
                "jp":row[3],
                "description":row[4]
            }
            out_json.append(new_word)
            count += 1
        if 100 < count:
            break

with open('mydata.json', mode='wt', encoding='utf-8') as file:
  json.dump(out_json, file, ensure_ascii=False, indent=2)
