const activeTodosBtn = document.getElementById('active');
const completedTodosBtn = document.getElementById('completed');
const completedTodosDiv = document.getElementById('completedTodos');
const activeTodosDiv = document.getElementById('activeTodos');

const showActiveTodos = () => {
    completedTodosDiv.style.display = 'none';
    activeTodosDiv.style.display = 'block';
    activeTodosBtn.style.color = '#3a7bfd';
    completedTodosBtn.style.color = '#515267';
};

const showCompletedTodos = () => {
    activeTodosDiv.style.display = 'none';
    completedTodosDiv.style.display = 'block';
    activeTodosBtn.style.color = '#515267';
    completedTodosBtn.style.color = '#3a7bfd';
};

const activeWhiteHover = () => {
    activeTodosBtn.style.color = 'white';
};

const activeBlueHover = () => {
    activeTodosBtn.style.color = '#3a7bfd';
};

const completeWhiteHover = () => {
    completedTodosBtn.style.color = 'white';
};

const completeBlueHover = () => {
    completedTodosBtn.style.color = '#3a7bfd';
};


activeTodosBtn.addEventListener('click', showActiveTodos);
activeTodosBtn.addEventListener('mouseover', activeWhiteHover);
activeTodosBtn.addEventListener('mouseout', activeBlueHover);

completedTodosBtn.addEventListener('click', showCompletedTodos);
completedTodosBtn.addEventListener('mouseover', completeWhiteHover);
completedTodosBtn.addEventListener('mouseout', completeBlueHover);
