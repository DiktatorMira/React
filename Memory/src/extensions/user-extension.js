import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { getUsersFromLocalStorage(); }, []);
    const getUsersFromLocalStorage = () => {
        const usersData = localStorage.getItem('users');
        if (usersData) setUsers(JSON.parse(usersData));
        setIsLoading(false);
    };
    const addUser = (login, password) => {
        if (isUserExists(login)) return Promise.resolve('Пользователь уже существует');
        const newUser = { login, password };

        try {
            const updatedUsers = [...users, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            setCurrentUser(login);
            localStorage.setItem('currentUser', login);
            return Promise.resolve('Пользователь успешно добавлен');
        } catch (error) {
            console.error('Ошибка добавления пользователя:', error);
            return Promise.reject('Не удалось добавить пользователя');
        }
    };
    const isUserExists = username => {
        return users.some(user => user.login === username);
    };
    const isUserValid = (login, password) => {
        const isValid = users.some(user => user.login === login && user.password === password);
        if (isValid) setCurrentUser(login);
        return isValid;
    };

    return (
        <UserContext.Provider value={{ currentUser, addUser, isUserExists, isUserValid, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default function UserExtension() {
    const { currentUser, addUser, isUserExists, isUserValid, isLoading } = useUser();
    return {
        currentUser,
        addUser,
        isUserExists,
        isUserValid,
        isLoading
    };
}