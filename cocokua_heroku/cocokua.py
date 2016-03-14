from flask import Flask
from flask import render_template
from flask import request
import cookielib, urllib2

app = Flask(__name__)

cj = cookielib.CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
r = opener.open("http://www.letsyoutube.com/")
for cookie in cj:
        print (cookie)

@app.route("/")
def cocokua_home():
	return render_template('index.html')

@app.route('/i_<video>_n_<room>_n_<invitor>/')
def cocokua_invite(video, room, invitor):
        return render_template('index.html')

@app.route('/r_<video>_n_<room>/')
def cocokua_room(video, room):
        return render_template('room.html', v=video, r=room)

@app.route('/watch')
def cookua_from_youtube_to_room():
        video = request.args.get('v')
        return render_template('room.html', v=video)

@app.route("/PrivacyPolicy/")
def cocokua_PrivacyPolicy():
	return render_template('PrivacyPolicy.html')

if __name__ == "__main__":
	app.run(debug=True)

