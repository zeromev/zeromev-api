# Node API Server

## Instructions

After node is installed and successful, Node APIs need to be executed. In order to run node APIs in background and as a service. Perform the following steps.

- Copy the api-server folder or contents of this folder and place them on the server in /opt directory.

```bash
sudo cp -r api-server /opt
```

- Copy the **server.service** file and move it to /etc/systemd/system directory.

```bash
sudo cp server.service /etc/systemd/system
```

- Now cd into the APIs folder and run the following command

```bash
cd /opt/api-server
npm i
```

- This will pull and install all the third party dependencies and packages for the APIs to work. If you want to run this API server on a port different then port 80, then you can change it in **.env** file in api-server directory.

- Now simply run the following commands to make sure APIs start and are working correctly.

```bash
sudo systemctl enable server
sudo systemctl start server
sudo systemctl status server
```

- This will start the Node APIs and enable them for future starts incase the server is restarted
