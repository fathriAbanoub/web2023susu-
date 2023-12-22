// Function to add edit and delete buttons to a task
function addEditDeleteButtons(task_elem) {
    const editBtn = $('<span>')
        .addClass('edit-btn')
        .text('✎')
        .on('click', function () {
            // Prompt user to edit the task
            const updatedTask = prompt('Edit task:', task_elem.find('span.task-text').text());
            if (updatedTask !== null) {
                // Update the task text
                task_elem.find('span.task-text').text(updatedTask);
            }
        });

    const deleteBtn = $('<span>')
        .addClass('edit-btn')
        .text('❌')
        .on('click', function () {
            if (task_elem.hasClass('important')) {
                // If the task is important, show a confirmation modal before deletion
                const confirmDelete = confirm('Are you sure you want to delete this important task?');
                if (confirmDelete) {
                    task_elem.remove();
                }
            } else {
                task_elem.remove();
            }
        });

    task_elem.append(editBtn).append(deleteBtn);
}

// Function to fetch user data based on user ID
async function fetchUserData(userId) {
    const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try {
        // Fetch user data using AJAX
        const response = await $.ajax({
            url: userUrl,
            method: 'get',
            dataType: 'json'
        });

        return response.name;
    } catch (error) {
        // Return 'Unknown User' if there is an error
        return 'Unknown User';
    }
}

// Function to show error messages
function showError(message) {
    $('#userIdError').text(message);
}

// Event handler for form submission
$('#taskForm').on('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const title = $('#title').val();
    const body = $('#body').val();
    const userId = $('#userId').val();
    const isImportant = $('#important').prop('checked');

    // Validate user ID
    if (userId < 1 || userId > 10 || isNaN(userId)) {
        showError('Enter a valid user ID (1-10).');
        return;
    } else {
        showError('');
    }

    // Create task element
    const task_elem = $('<div>')
        .addClass('task')
        .append('<input type="checkbox">')
        .append(`<span class="task-text">${title}</span>`)
        .append('<div class="creator"></div>');

    if (isImportant) {
        task_elem.addClass('important');
    }

    // Add edit and delete buttons to the task
    addEditDeleteButtons(task_elem);

    // Add the task to the appropriate section
    if (isImportant) {
        $('#tasks').prepend(task_elem);
    } else {
        $('#tasks').append(task_elem);
    }

    try {
        // Send data to the server and get the response
        const response = await $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            method: 'post',
            dataType: 'json',
            data: {
                title: title,
                body: body,
                userId: userId,
                completed: false
            }
        });

        // Get user name by ID and display the creator of the task
        const creatorName = await fetchUserData(userId);
        task_elem.find('.creator').text('Created by: ' + creatorName);

        console.log(response);
        console.log(JSON.stringify(response));
    } catch (error) {
        console.error(error);
    }
});

// Event handler for checkbox click
$('body').on('click', 'input[type="checkbox"]', function () {
    const task = $(this).parents('.task');

    // Toggle strikeout and move to 'done' section
    if (task.hasClass('strikeout')) {
        task.removeClass('strikeout');
        if (task.hasClass('important')) {
            task.prependTo($('#tasks'));
        } else {
            task.appendTo($('#tasks'));
        }
    } else {
        task.addClass('strikeout');
        task.appendTo($('#done'));
    }
});

// Event handlers for mouse enter and leave on tasks
$('#tasks, #done').on('mouseenter', '.task', function () {
    $(this).find('.edit-btn').show();
});

$('#tasks, #done').on('mouseleave', '.task', function () {
    $(this).find('.edit-btn').hide();
});

// Function to apply the saved theme
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        $('body, #tasks, #done').removeClass('light-mode dark-mode').addClass(savedTheme + '-mode');
    }
}

// Function to toggle between light and dark themes
function toggleTheme() {
    $('body').toggleClass('light-mode dark-mode');
    $('#tasks, #done').removeClass('light-mode dark-mode').addClass($('body').attr('class'));
    const currentTheme = $('body').hasClass('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);

    // Update background image based on the theme
    const backgroundImage = currentTheme === 'light' ? 'var(--light-background-image)' : 'var(--dark-background-image)';
    $('body.light-mode section').css('background-image', backgroundImage);
    $('body.dark-mode section').css('background-image', backgroundImage);
}

// Populate user dropdown on page load
async function populateUserDropdown(users) {
    const selectField = $('#userId');
    users.forEach((user) => {
        const option = $('<option>')
            .attr('value', user.id)
            .text(user.name);
        selectField.append(option);
    });
}

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'get',
            dataType: 'json'
        });

        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Implement the ability to add posts to important ones (Store the importance attribute in localStorage). Such posts are displayed first.
function checkImportanceLocalStorage() {
    const storedImportance = localStorage.getItem('importance');
    if (storedImportance && storedImportance.toLowerCase() === 'true') {
        $('#tasks .task:not(.important)').prependTo($('#tasks'));
    }
}

// Event handler for changing theme
$('#themeToggle').on('click', function() {
    toggleTheme();
});

// Check importance attribute in localStorage on page load
checkImportanceLocalStorage();

// Implement a loader when loading posts
$(document).ajaxStart(function () {
    $('#loader').show();
}).ajaxStop(function () {
    $('#loader').hide();
});

// Apply the saved theme on page load
applyTheme();

// Fetch users and populate dropdown on page load
(async function () {
    const users = await fetchUsers();
    populateUserDropdown(users);
    })();
    
    // Event handler for form submission
    $('#taskForm').on('submit', async function (e) {
    e.preventDefault();
    // Get form values
const title = $('#title').val();
const body = $('#body').val();
const userId = $('#userId').val();
const isImportant = $('#important').prop('checked');

// Validate user ID
if (userId < 1 || userId > 10 || isNaN(userId)) {
    showError('Enter a valid user ID (1-10).');
    return;
} else {
    showError('');
}

// Create task element
const task_elem = $('<div>')
    .addClass('task')
    .append('<input type="checkbox">')
    .append(`<span class="task-text">${title}</span>`)
    .append('<div class="creator"></div>');

if (isImportant) {
    task_elem.addClass('important');
}

// Add edit and delete buttons to the task
addEditDeleteButtons(task_elem);

// Add the task to the appropriate section
if (isImportant) {
    $('#tasks').prepend(task_elem);
} else {
    $('#tasks').append(task_elem);
}

try {
    // Send data to the server and get the response
    const response = await $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'post',
        dataType: 'json',
        data: {
            title: title,
            body: body,
            userId: userId,
            completed: false
        }
    });

    // Get user name by ID and display the creator of the task
    const creatorName = await fetchUserData(userId);
    task_elem.find('.creator').text('Created by: ' + creatorName);

    console.log(response);
    console.log(JSON.stringify(response));
} catch (error) {
    console.error(error);
}
});
