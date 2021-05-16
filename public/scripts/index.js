/**
 * Modify list according to item chosen to be modified with new modify list.
 */
$('#update-btn').click(() => {

    let item_to_mod = $('#item-to-mod').val();
    let new_item = $('#new-item').val();

    $.ajax({
            url: '/',
            method: 'put',
            data: {
                mod_item: item_to_mod.toLowerCase(),
                update_item: new_item
            }
        })
        .done(response => {
            if (response === 'null') {
                alert(`Modification failed: The item, '${item_to_mod}', was not found in the database.`)
            } else {
            window.location = '/';
            }
        })

})

/**
 * Delete the item submitted by the user if it is in the list.
 */
$('#delete-btn').click(() => {

    let delete_item = $('#item-to-delete').val();

    $.ajax({
            url: '/',
            method: 'delete',
            data: {
                del_item: delete_item.toLowerCase()
            }
        })
        .done(response => {
            if (response === 'Nothing deleted') {
                alert(`Deletion failed: The item, '${delete_item}', was not found in the database.`)
            } else {
            window.location = '/';
            }
        })

})