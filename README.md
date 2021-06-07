# New Growth
![splash](https://github.com/posidest/new-growth/blob/main/react-app/public/new-growth-splash-2.png)
![user-profile](https://github.com/posidest/new-growth/blob/main/react-app/public/new-growth-user-profile.png)

## Table of contents
* [About](#about)
* [Motivation](#motivation)
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#installation)

## About
New Growth is a social house plant care app. Users can track their plants' growth, and compare notes with other gardeners.  

[Live Link](https://new-growth.herokuapp.com/)

## Motivation
I wanted to create an application geared towards new plant parents or anyone who feels they "can't" keep plants alive, people who have killed plants before, and anyone who is excited about house plants. New Growth makes it easy to show your friends your plant babies, to discover plants you might wish to add to your collection, and to see how others are caring for their plants.


## Technologies
### Back End
New Growth uses a Flask Python backend with Flask SQLAlchemy as an ORM to manage a PostgresQL database.

### Front End
New Growth has a React.js / Redux.js front end.

## Other 
New Growth uses AWS S3 to store users' avatars and plant images.

## Features

### User Authorization
- A user can sign up securely and create a personalized profile with their USDA zone, avatar, and bio.  
- A user can login securely as well as logout easily.

### Plants  
- A user can add a plant in their garden with an image and nickname. 
- A drop-down menu of common plant types will be provided to add additional details.

### Care Entries 
- A user can create care entries on any of their plants.  
- These entries can include watering, fertilization, pruning, or any other plant-tending activities.  
- A user can include progress pics of their plants growth.  

### Plant Profiles
- Plant profiles will provide scientific information as well as basic care instructions for common plants.  
- A user can select a profile when adding or editing a plant, to provide them with additional guidance and info on their plant.

### Search by Plant Name
- A user can search for plants by plant name.  
- This will allow them to compare their care of a specific plant to other peoples care.
 
### Follows
- A user can "follow" another user and view their plant-tending activities.

## Installation

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/posidest/new-growth
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

