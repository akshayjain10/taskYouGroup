import pandas as pd
from flask import Flask
from flask_cors import CORS
from api.config import Config


filename = 'api/klook_october_month_data.csv'
data = pd.read_csv(filename)
df = pd.DataFrame(data)
print("DF Created")


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    from api.evaluate.routes import data
    from api.errors.handlers import errors

    app.register_blueprint(data, url_prefix='/api')
    app.register_blueprint(errors)

    return app
