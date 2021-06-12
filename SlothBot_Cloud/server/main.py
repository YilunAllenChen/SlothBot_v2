# Required Imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app, storage

# Initialize Flask App
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json.secret')
default_app = initialize_app(cred)
db = firestore.client()
db_ref = db.collection('slothbots')


bucket = storage.bucket()


@app.route("/")
def hi():
    return "Hi!"

@app.route('/add', methods=['POST'])
@app.route('/set', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        db_ref.document(id).set(request.json, merge=True)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/get', methods=['GET', "POST"])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        doc : Return document that matches query ID
        all_docs : Return all documents
    """
    try:
        # Check if ID was passed to URL query
        doc_id = request.json.get('id')    
        if doc_id:
            doc = db_ref.document(doc_id).get() 

            return jsonify(doc.to_dict()), 200
        else:
            all_docs = [doc.to_dict() for doc in db_ref.stream()]
            return jsonify(all_docs), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        db_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection
    """
    try:
        # Check for ID in URL query
        doc_id = request.args.get('id')
        db_ref.document(doc_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=5000)
