# script.py
import sys
import json
import pandas as pd
import requests
import os
from collections import defaultdict
from script2 import remove_solved_problems 
from script3 import build_ltr_df
from script4 import rank_problems
try:

    data = json.load(sys.stdin)  # read JSON from Node
    #print("Received:", data)

    # Do your processing
    result = {
        "message": "Processed successfully",
        "input": data
    }

    #print(json.dumps(result))  # send back JSON
    #print("Ok I think I got it")
    handle = data["handle"]
    API_URL = "https://codeforces.com/api/user.status"
    
    rating =data["rating"]
    user_output={}

    try:
        response = requests.get(API_URL, params={"handle": handle})
        data = response.json()

        if data["status"] != "OK":
            print(f"Skipping {handle} (API error)")
            

        submissions = data["result"]

        tag_count = defaultdict(int)
        seen_problems = set()

        for sub in submissions:
            if sub.get("verdict") == "OK":
                problem = sub.get("problem", {})

                # Unique problem key
                key = (problem.get("contestId"), problem.get("index"))

                if key in seen_problems:
                    continue
                seen_problems.add(key)

                for tag in problem.get("tags", []):
                    tag_count[tag] += 1

        user_output = {
            "handle": handle,
            "currentRating": rating,
            "tagCount": dict(tag_count)
        }

    except Exception as e:
        print(f"Error processing {handle}: {e}")
        
    # print(user_output)



    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "onehot.csv")

    df = pd.read_csv(file_path)
    #df = pd.read_csv("./onehot.csv")
    pidf = remove_solved_problems(df,handle)
    #print("done")

    rel =build_ltr_df(pidf,user_output)
    #print(rel.columns)

    aabha =rank_problems(rel)
    print(aabha)
except Exception as e:
    print(json.dumps({"error": str(e)}))