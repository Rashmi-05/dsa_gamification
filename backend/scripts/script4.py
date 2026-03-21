import pickle
import os

def rank_problems(ltr_df, top_k=20):

    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "lgbm_ranker.pkl")
    # load trained model
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    # keep identifiers separately
    ids = ltr_df[["contestId", "index"]]

    # drop non-feature columns
    feature_df = ltr_df.drop(columns=["contestId", "index", "name", "type", "userRatingAtSolve"])

    # predict scores
    scores = model.predict(feature_df)

    # attach scores to identifiers
    result = ids.copy()
    result["score"] = scores

    # sort by score
    result = result.sort_values("score", ascending=False)

    # return top problems
    return result.head(top_k)