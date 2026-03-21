import requests
import pandas as pd

def remove_solved_problems(df, handle):
    url = f"https://codeforces.com/api/user.status?handle={handle}"
    
    response = requests.get(url)
    data = response.json()
    
    if data["status"] != "OK":
        raise Exception("API request failed")

    solved = set()

    for sub in data["result"]:
        if sub["verdict"] == "OK":
            problem = sub["problem"]
            contest_id = problem.get("contestId")
            index = problem.get("index")
            solved.add((contest_id, index))

    # remove solved problems
    filtered_df = df[~df.apply(lambda row: (row["contestId"], row["index"]) in solved, axis=1)]

    return filtered_df