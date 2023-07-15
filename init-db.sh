mongosh "mongodb://$ADMIN_USER:$ADMIN_PSSWD@$NET_NAME" << EOF
use app
db.createUser({user: "$APP_USER", pwd: "$APP_PSSWD", roles: [{role: "readWrite", db: "$DB_NAME"}, {role: "dbAdmin", db: "$DB_NAME"}]})
quit()
EOF