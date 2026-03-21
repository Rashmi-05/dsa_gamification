import pandas as pd

def build_ltr_df(pidf, user_output):

    rating = user_output["currentRating"]
    tag_counts = user_output["tagCount"]

    # find all problem tag columns
    tag_cols = pidf.columns
    tag_cols = tag_cols[7:]
    #print(tag_cols)
    user_features = {"currentRating": rating}

    for col in tag_cols:
        tag = col  # remove _x
        user_features[f"{tag}_y"] = tag_counts.get(tag, 0)

    user_df = pd.DataFrame([user_features])

    # repeat user vector for each row
    user_df = pd.concat([user_df] * len(pidf), ignore_index=True)

    pidf = pidf.reset_index(drop=True)

    final_df = pd.concat([pidf, user_df], axis=1)

    return final_df