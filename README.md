# Newsspec-8573

Calcualtor for the price of supporting your football club

## Updating the data
The data can easily be updated by following these steps.

* Update the data files (**/data/teams.xls, /data/leagues.xls**) to contain the correct data.
* Move into the data folder

```
cd data/
```
* Run the PHP generator

```
php generate.php
```
* Move back to the root of the project

```
cd ../
```

* Update the project data files using grunt

```
grunt updateData
```

## Getting started

Set up the project

```
grunt
```

Make images responsive

```
grunt images
```

Build World Service version

```
grunt translate
```

## iFrame scaffold

This project was built using the iFrame scaffold v1.5.3

## License
Copyright (c) 2014 BBC