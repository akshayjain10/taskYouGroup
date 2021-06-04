from flask import Blueprint, jsonify, request
from api import df
import math

data = Blueprint('data', __name__)
num_of_items = 50


def paginate_dataframe(dataframe, page):
    offset = num_of_items*(page-1)
    return dataframe[offset:offset + num_of_items]


@data.route("/data", methods=['POST'])
def getData():
    body = request.json
    page = body['page'] or 1
    sort = body['sort'] or 'price'

    copy_df = df.copy(deep=True)

    copy_df.sort_values(sort, axis=0, ascending=False, inplace=True)
    copy_df = copy_df.reset_index(drop=True)
    copy_df['index'] = copy_df.index

    paginated_records = paginate_dataframe(copy_df, page)
    records = paginated_records.to_dict(orient='records')
    data = {}
    data['records'] = records
    data['current_page'] = page
    data['total_pages'] = math.ceil(len(df.index)/num_of_items)
    data['total_count'] = len(df.index)

    del copy_df
    return jsonify(result=data), 200
