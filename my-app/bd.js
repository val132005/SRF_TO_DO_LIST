/*

DROP TYPE IF EXISTS state_item;
DROP TYPE IF EXISTS state_user;


-- Crear tipo ENUM para el estado de los ítems
CREATE TYPE state_item AS ENUM ('undone', 'done', 'in_process');

-- Crear tipo ENUM para el estado de los usuarios
CREATE TYPE state_user AS ENUM ('active', 'inactive');

-- Crear tipo ENUM para el estado de los usuarios
CREATE TYPE priority_item AS ENUM ('high', 'medium', 'low');


CREATE TABLE photo (
    id_photo SERIAL PRIMARY KEY,                -- ID autoincrementable
    content_photo TEXT UNIQUE NOT NULL          -- Contenido único de la foto
);


CREATE TABLE toDoList (
    id_todolist SERIAL PRIMARY KEY,             -- ID autoincrementable
    name_todolist TEXT NOT NULL,                -- Nombre de la lista de tareas
    date_creation_todolist DATE NOT NULL,       -- Fecha de creación de la lista
    date_last_update_todolist DATE,             -- Fecha de última actualización de la l
);

CREATE TABLE item (
    id_item SERIAL PRIMARY KEY,                 -- ID autoincrementable
    name_item TEXT NOT NULL,                    -- Nombre del ítem
    description_item TEXT NOT NULL,             -- Descripción del ítem
    state_item state_item NOT NULL,             -- Estado del ítem (ENUM)
    priority_item priority_item NOT NULL,
    id_todolist INT NOT NULL,
    CONSTRAINT fk_todolist_items FOREIGN KEY (id_todolist) REFERENCES toDoList(id_todolist)

);

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,                 -- ID autoincrementable
    name_user TEXT NOT NULL,                    -- Nombre del usuario
    document_user BIGINT UNIQUE NOT NULL,       -- Documento único del usuario
    state_user state_user NOT NULL,             -- Estado del usuario (ENUM)
    password_user TEXT NOT NULL,                 -- Contraseña del usuario
    id_todolist INT NOT NULL,
    CONSTRAINT fk_todolist_user FOREIGN KEY (id_todolist) REFERENCES toDoList(id_todolist)
);


CREATE TABLE photoGallery (
    id_photogallery SERIAL PRIMARY KEY,         -- ID autoincrementable
    name_photogallery TEXT NOT NULL,            -- Nombre de la galería de fotos
    id_user INT UNIQUE NOT NULL,                       -- FK para la relación con users
    id_photo INT  NOT NULL,                               -- FK para la relación con photos (uno a muchos)
    CONSTRAINT fk_user_photogallery FOREIGN KEY (id_user), REFERENCES users(id_user),   -- Relación 1:1 con users
    CONSTRAINT fk_photo_photogallery FOREIGN KEY (id_photo) REFERENCES photo(id_photo) -- Relación 1:N con photo
);


*/