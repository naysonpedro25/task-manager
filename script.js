(function () {


    const listItem = document.querySelector('.todo');
    const list = document.querySelector(".list-todo");
    const loading = document.querySelector(".loading");
    const loadingTodo = document.querySelector(".loading-update-todo");

    const inputTitle = document.querySelector('.input_title');
    const inputDesc = document.querySelector('.input_desc');

    const inputSearch = document.querySelector('#pesquisa');
    const btnSearch = document.querySelector(".btn-search");
    const btnClose = document.querySelector(".btn-close");
    const modal = document.querySelector("dialog");


    (function () {
        getAllToDos();
        configModal();
    })();

    function configModal() {
        btnSearch.onclick = (e) => {
            const id = Number(inputSearch.value.trim());

            if (isNaN(id) || id === 0) {
                document.querySelector('.search-input-container').classList.add('search-input-container-error');
                return;
            }
            getAllToDosOfUser(id);
            modal.showModal();


        }

        btnClose.onclick = function () {
            modal.close();
        }

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.close();
            }
        }
    }

    async function getAllToDos() {
        try {

            const request = await fetch('https://jsonplaceholder.typicode.com/todos')
            if (!request.ok) {
                throw new Error("fifibfb")
                getAllToDos();
            }
            const data = await request.json();
            for (let i in data) {
                if (i < 100) {
                    const mItem = data[i];
                    const newItem = listItem.cloneNode(true);
                    newItem.querySelector('p').innerText = `Usuário: ${mItem.userId} - ${mItem.title} \n Descrição: Nenhuma`;
                    newItem.querySelector('.btn_delete');
                    newItem.classList.remove('ex')

                    newItem.querySelector('.btn_complet').onclick = (e) => {
                        e.preventDefault();
                        updateTodo(mItem.id, {
                            completed: !mItem.completed
                        });
                        mItem.completed = !mItem.completed;
                        newItem.classList.toggle("completed-todo")
                    }

                    list.appendChild(newItem);
                }
            }
            loading.style.display = "none"
        } catch (error) {
            console.error('Erro no fetch: ', error);
        }
    }



    async function updateTodo(id, body) {
        try {
            loadingTodo.style.display = "block"
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!request.ok) {
                throw new Error("erro da net")
            }
            const data = await request.json();
            console.log(data);
            loadingTodo.style.display = "none"
        } catch (e) {
            console.log(e);
        }

    }

    // showModalResult()












    async function getAllToDosOfUser(userId) {
        try {
            const listResult = document.querySelector('.list-result');
            const loadingResult = document.querySelector('.loading-result');
            loadingResult.style.display = "block"

            const request = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            if (!request.ok) {
                throw new Error("fifibfb")
            }
            const data = await request.json();

            for (let i in data) {

                const mItem = data[i];
                const newItem = listItem.cloneNode(true);
                newItem.querySelector('p').innerText = `Usuário: ${mItem.userId} - ${mItem.title} \n Descrição: Nenhuma`;
                newItem.querySelector('.btn_delete');
                newItem.classList.remove('ex')

                newItem.querySelector('.btn_complet').onclick = (e) => {
                    e.preventDefault();
                    updateTodo(mItem.id, {
                        completed: !mItem.completed
                    });
                    mItem.completed = !mItem.completed;
                    newItem.classList.toggle("completed-todo")
                }

                listResult.appendChild(newItem);
            }
            loadingResult.style.display = "none"
        } catch (error) {
            console.error('Erro no fetch: ', error);
        }
    }

    // const user1 = getAllToDosOfUser(2);
    // user1.then(user1 =>{
    //     for(todos of user1){
    //         console.log(todos);
    //     }
    // }).catch((erro)=>{
    //     console.log(erro);
    // })

    async function addNewToDo(title) {
        try {
            const request = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: 1,
                    id: 201,
                    title: title,
                    completed: true
                })
            });

            if (!request.ok) {
                throw new Error("Internet de bosta");
            }

            const data = await request.json();
            console.log(data);


        } catch (error) {
            console.log(error);
        }
    }

    // addNewToDo("SEXO");

    // async function updateTodo(idTodo, newTitle, isCompleted) {

    //     try {
    //         const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${idTodo}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 title: newTitle,
    //                 completed: isCompleted
    //             })
    //         });

    //         if (!request.ok) {
    //             throw new Error("erro da net")
    //         }
    //         const data = await request.json()
    //         return data;
    //     } catch (e) {
    //         console.log(e);
    //     }

    // }




})();

/**{
 "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false

}
 */