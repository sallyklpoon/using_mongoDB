
$(document).ready(() => {

    let next_todo_num = 2

    $('#first-add-btn').click( () => {

        $('#first-add-btn').remove()
        addNextInput(next_todo_num)

    })

})

const addNextInput = item_num => {

    let input_form = document.getElementById('all-inputs')
    input_form.appendChild(createInputDiv(item_num))

}

const createInputDiv = item_num => {

    let input_div = document.createElement('div')
    input_div.setAttribute('class', 'input-container')

    let input_label = document.createElement('label')
    input_label.textContent = `Todo Item ${item_num}`

    let input_field = document.createElement('input')

    let add_btn = document.createElement('button')
    add_btn.setAttribute('type', 'button')
    add_btn.setAttribute('id', 'add-btn')
    add_btn.textContent = '+'

    addBtnListener(add_btn, item_num)

    input_div.appendChild(input_label)
    input_div.appendChild(input_field)
    input_div.appendChild(add_btn)


    return input_div

}

const addBtnListener = (button_element, item_num) => {

    button_element.addEventListener('click', () => {

        $('#add-btn').remove()
        addNextInput(item_num + 1)

    })

}