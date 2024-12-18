/*

DROP TYPE IF EXISTS state_item;
DROP TYPE IF EXISTS state_user;
DROP TYPE IF EXISTS priority_item;



-- Crear tipo ENUM para el estado de los ítems
CREATE TYPE state_item AS ENUM ('undone', 'done', 'in_process');

-- Crear tipo ENUM para el estado de los usuarios
CREATE TYPE state_user AS ENUM ('active', 'inactive');

-- Crear tipo ENUM para la prioridad de los ítems
CREATE TYPE priority_item AS ENUM ('high', 'medium', 'low');

-- Crear tabla de usuarios
CREATE TABLE userr (
    id_user SERIAL PRIMARY KEY,                 
    name_user TEXT NOT NULL,                   
    document_user BIGINT UNIQUE NOT NULL,       
    state_user state_user NOT NULL,             
    password_user TEXT NOT NULL                
);

-- Crear tabla de listas de tareas
CREATE TABLE toDoList (
    id_todolist SERIAL PRIMARY KEY,  
    id_user INT NOT NULL,                  
    CONSTRAINT fk_user_todolist FOREIGN KEY (id_user) REFERENCES userr(id_user)  -- Corregir referencia de tabla
);

-- Crear tabla de ítems
CREATE TABLE item (
    id_item SERIAL PRIMARY KEY,               
    name_item TEXT NOT NULL,                    
    description_item TEXT NOT NULL,            
    state_item state_item NOT NULL,           
    priority_item priority_item NOT NULL,
    id_todolist INT NOT NULL,
    CONSTRAINT fk_todolist_items FOREIGN KEY (id_todolist) REFERENCES toDoList(id_todolist)
);


CREATE TABLE photoGallery (
    id_photogallery SERIAL PRIMARY KEY,             
    id_user INT UNIQUE NOT NULL,                              
    CONSTRAINT fk_user_photogallery FOREIGN KEY (id_user) REFERENCES userr(id_user)   
);



CREATE TABLE photo (
    id_photo SERIAL PRIMARY KEY,               
    content_photo TEXT UNIQUE NOT NULL,
    id_photogallery INT NOT NULL,
    CONSTRAINT fk_photoGallery_photo FOREIGN KEY (id_photogallery) REFERENCES photoGallery(id_photogallery)
);




*/
