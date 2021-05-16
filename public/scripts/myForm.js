const addbtn = document.querySelector('#submit-form')

// Run when page completes loading.
$(document).ready(() => {

    let next_todo_num = 2

    $('#first-add-btn').click( () => {

        $('#first-add-btn').remove()
        addNextInput(next_todo_num)

    })
})



/**
 * Add a new input div to the form.
 * @param {Number} item_num  The item number for new the new input div element.
 */
const addNextInput = item_num => {

    let input_form = document.getElementById('all-inputs')
    input_form.appendChild(createInputDiv(item_num))

}

/**
 * Create a new input div.
 * @param {Number} item_num The item number for the new input div element.
 * @returns The complete input div to be added to the form.
 */
const createInputDiv = item_num => {

    // Create the div
    let input_div = document.createElement('div')
    input_div.setAttribute('class', 'input-container')

    // Create label
    let input_label = document.createElement('label')
    input_label.textContent = `Todo Item ${item_num}`

    // Create input
    let input_field = document.createElement('input')
    input_field.setAttribute('name', `item${item_num}`)

    // Create add button
    let add_btn = document.createElement('button')
    add_btn.setAttribute('type', 'button')
    add_btn.setAttribute('id', 'add-btn')
    add_btn.textContent = '+'

    // add event listener to add button
    addBtnListener(add_btn, item_num) 

    // Append all elements togther into the input div
    input_div.appendChild(input_label)
    input_div.appendChild(input_field)
    input_div.appendChild(add_btn)

    return input_div

}


/**
 * Add an Event Listener to the add button to create next input element on click.
 * @param {Element} button_element The add button to attach Event Listener to.
 * @param {Number} item_num The current item number for this associated button element.
 */
const addBtnListener = (button_element, item_num) => {

    button_element.addEventListener('click', () => {

        // Remove the add button
        $('#add-btn').remove()

        // Add the next input by incrementing the current item number by 1
        addNextInput(item_num + 1)

    })

}