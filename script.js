(function () {


    const listItem = document.querySelector('.todo');
    const list = document.querySelector(".list-todo");

    const loading = document.querySelector(".loading");
    const loadingTodo = document.querySelector(".loading-update-todo");
    const loadingBtnAdd = document.querySelector(".loading-btn");
    const icBtnAdd = document.querySelector(".ic-btn-add");

    const inputTitle = document.querySelector('.input_title');
    const inputDesc = document.querySelector('.input_desc');
    const btnAdd = document.querySelector('.btn-add');

    const inputSearch = document.querySelector('#pesquisa');
    const btnSearch = document.querySelector(".btn-search");
    const btnClose = document.querySelector(".btn-close");
    const modal = document.querySelector("dialog");


    (function () {
        getAllToDos();
        configModal();

        btnAdd.onclick = (e) => {
            e.preventDefault();
            addNewToDo();
        }

    })();

    async function addNewToDo() {
        try {
            icBtnAdd.style.visibility = 'hidden';
            loadingBtnAdd.style.display = 'block';
            const mInputTitle = inputTitle.value.trim();
            const mInputDesc = inputDesc.value.trim(); 
            const error = document.querySelector('.error-inputs'); 
            if(mInputDesc ==="" || mInputTitle ===""){
                error.style.display = "block";
                icBtnAdd.style.visibility = 'visible';
                loadingBtnAdd.style.display = 'none';
                return;
            }

            error.style.display = "none";

            const request = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: 11,
                    id: list.length + 1,
                    title: mInputTitle,
                    completed: false

                })
            });

            if (!request.ok) {
                throw new Error("Internet de bosta");
            }

            const data = await request.json();
            const newItem = listItem.cloneNode(true);
            newItem.querySelector('p').innerText = `Usuário: ${data.userId} - ${data.title} \n Descrição: ${mInputDesc}`;
            newItem.querySelector('.btn_delete');
            newItem.classList.remove('ex')

            newItem.querySelector('.btn_complet').onclick = (e) => {
                e.preventDefault();
                updateTodo(data.id, {
                    completed: !data.completed
                });
                data.completed = !data.completed;
                newItem.classList.toggle("completed-todo")
            }

            list.insertBefore(newItem, list.firstChild);
            icBtnAdd.style.visibility = 'visible';
            loadingBtnAdd.style.display = 'none';


        } catch (error) {
            console.log(error);
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
                if (i < 10) {
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

                    newItem.querySelector('.btn_delete').onclick = (e) => {
                        e.preventDefault();
                        deleteTodo(mItem.id) 
                        newItem.remove();
                        if (Array.from(list.querySelectorAll('.todo')).length === 1) { list.querySelector('.no-todos').style.display = "block" }
                        console.log(Array.from(list.querySelectorAll('.todo')).length);
                    }
                    list.appendChild(newItem);
                }
            }

            if (Array.from(list.querySelectorAll('.todo')).length === 1) { list.querySelector('.no-todos').style.display = "block" }
            loading.style.display = "none"
        } catch (error) {
            console.error('Erro no fetch: ', error);
        }
    }

    function configModal() {
        btnSearch.onclick = (e) => {
            const id = Number(inputSearch.value.trim());

            if (isNaN(id) || id === 0 || id > 200) { // tratei aq por preguça mas dá pra tratar no getAllToDosOfUser
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

    async function updateTodo(id, body) {
        try {
            if (id > 200) return;
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






    function invertList() {
        const itens = Array.from(list.querySelectorAll(".todo"));
        itens.reverse();
        list.innertHtml = "";
        itens.forEach((item) => {
            list.appendChild(item);
        })
    }





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
            listResult.innerHTML = "";
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



    async function deleteTodo(id) {
        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!request.ok) {
                throw new Error("erro da net")
            }
            const data = await request.json();
        } catch (e) {
            console.log(e);
        }
    }



})();

