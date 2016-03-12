from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
def cocokua_home():
	return render_template('index.html')

@app.route('/i_<video>_n_<room>_n_<invitor>/')
def cocokua_invite(video, room, invitor):
	return render_template('index.html')

@app.route('/r_<video>_n_<room>/')
def cocokua_room(video, room):
	return render_template('room.html', v=video, r=room)

@app.route("/PrivacyPolicy/")
def cocokua_PrivacyPolicy():
	return render_template('PrivacyPolicy.html')


if __name__ == "__main__":
	app.run()

