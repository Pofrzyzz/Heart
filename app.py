from flask import Flask, render_template
import os

app = Flask(__name__)

# Route to serve the home page with heart animation
@app.route('/')
def home():
    return render_template('index.html')

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
