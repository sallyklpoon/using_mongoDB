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
                mod_item: item_to_mod,
                update_item: new_item
            }
        })
        .done(response => {
            window.location = '/';
        })


})

/**
 * 
 */
$('#delete-btn').click(() => {

    let delete_item = $('#item-to-delete').val();

    $.ajax({
            url: '/',
            method: 'delete',
            data: {
                del_item: delete_item
            }
        })
        .done(response => {
            window.location = '/';
        })

})