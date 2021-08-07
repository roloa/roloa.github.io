
import csv
import json
import re

out_json = []


with open("./source_dic.csv", "r", encoding="utf-8", errors="", newline="" ) as csv_file:

    csv_file_reader = csv.reader(csv_file, delimiter=",", doublequote=True, lineterminator="\r\n", quotechar='"', skipinitialspace=True)

    csv_list = []
    for file_row in csv_file_reader:
        csv_list.append( file_row )

    count = 1

    for row in csv_list:
        print(row)

        if len(row[0]) == 1:
            continue;
        if int(row[1]) < 100:
            continue;
        if 1000 < int(row[1]):
            continue;
        if re.search('[A-Z]', row[0]):
            continue;
        if re.search('[ア-ン]', row[3]):
            continue;

        synonyms_list = []
        word_trunk = row[3]
        word_trunk = re.sub('な$|の$|に$|する$|した$|して$', '', word_trunk)
        if 1 <= len(word_trunk):
            for row_2 in csv_list:
                if ( word_trunk in row_2[3] ) or ( word_trunk in row_2[4] ):
                    if row[0] != row_2[0]:
                        synonyms_list.append(row_2[0])

        new_word = {
            "en":row[0],
            "jp":row[3],
            "description":row[4],
            "synonyms": synonyms_list
        }

        out_json.append(new_word)
        count += 1
        if 100000 < count:
            break

with open('easy.json', mode='wt', encoding='utf-8') as file:
  json.dump(out_json, file, ensure_ascii=False, indent=2)
