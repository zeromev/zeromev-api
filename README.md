# zeromev-api

This repo contains details and files for how to run the zeromev API server.

There are two main components for the API server to be used.

1. PostgresT

2. Node APIs

---

## 1. PostgresT

### Pre Requisties

Postgresql Server should be up and running and accepting connections

### Instructions

- Edit the postgrest.conf and update the postgres password (and database if needed)

- Place the postgrest.conf file in the /etc directory

- Place the postgrest.service file in /etc/systemd/system directory

- Place the **postgrest** binary in /usr/local/bin directory

Once the binary file, configuration file and service file are all place in relevant directories. Run the following commands to enable and start the postgresT service.

```bash
sudo systemctl enable postgrest
sudo systemctl start postgrest
sudo systemctl status postgrest
```

If there are any errors that occur while starting, they should pop up on status command. Check for credentials mentioned in postgrest.conf file if they are correct or not.

---

## 2. Node APIs

Node APIs work as a wrapper on default postgresT APIs, instead of exposing PostgresT service directly over the internet it is run on local port only and accepts local connections only. And node APIs provide custom endpoints and more dynamic control over postgresT and hence are exposed over the internet. Underneath the Node APIs are local calls to postgrest service.

NodeJS can be installed in different ways, either via package manager, or via default website download, via install.sh shell scripts. To make NodeJS available globally lets download the nodejs tar and install it systemwide. 

### Instructions

Download and Install Nodejs 21.7.2 using its tar script from the link below.

[21.7.2](https://nodejs.org/dist/v21.7.2/node-v21.7.2-linux-x64.tar.gz)

Run the following commands to download and load it

```bash
wget https://nodejs.org/dist/v21.7.2/node-v21.7.2-linux-x64.tar.gz
tar -xf node-v21.7.2-linux-x64.tar.gz
mv node-v21.7.2-linux-x64 /opt/node-v21.7.2-linux-x64
rm node-v21.7.2-linux-x64.tar.gz
echo "export NODEJS_HOME=/opt/node-v21.7.2-linux-x64/bin" >> ~/.bashrc
echo "export PATH=$NODEJS_HOME:$PATH" >> ~/.bashrc
source ~/.bashrc
```

This will install node **v21.7.2** on server, which is what the Node APIs were built using.

To verify this run the following commands

```bash
node -v
npm version
```

***Optional*** Once Installed lets export this NodeJS installation so its available on VM for all users. 
```bash
# Run this for any user that wants to access the node installation
echo "export NODEJS_HOME=/opt/node-v21.7.2-linux-x64/bin" >> ~/.bashrc
echo "export PATH=$NODEJS_HOME:$PATH" >> ~/.bashrc
source ~/.bashrc
```

Further Instructions on how to setup and run the APIs are in the api-server folder itself.
