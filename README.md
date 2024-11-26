# Repo for API Server

This repo contains details and files for how to run this API server.

There are two main components for the API server to be used.

1. PostgresT

2. Node APIs

---

## 1. PostgresT

### Pre Requisties

Postgresql Server should be up and running and accepting connections

### Instructions

- Place the postgrest.conf file in etc directory on the server.

- Place the postgrest.service file in /etc/systemd/system directory

- Place the **postgrest** binary in /usr/local/bin directory

- Use this tutorial to create a user and give read-only access to that particular database/table so that when you start postgresT it can read the schema and loads its service. [Tutorial 0 - Get it Running](https://postgrest.org/en/stable/tutorials/tut0.html) **Step 4 Only Required**

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

NodeJS can be installed in different ways, either via package manager, or via default website download, via install.sh shell scripts. But the best way is to use Node Version Manager (nvm). NVM allows us to use more then one node version, and also is the easy to install and use the exact version required.

### Instructions

Download and Install nvm using its shell script from the link below.

[NVM](https://github.com/nvm-sh/nvm)

Then run the following command once nvm is installed and loaded

```bash
nvm install 21.7.2
nvm use 21.7.2
```

This will install node **v21.7.2** on server, which is what the Node APIs were built using.

To verify this run the following commands

```bash
node -v
```

Further Instructions on how to setup and run the APIs are in the api-server folder itself.
