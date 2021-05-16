/**
 * Activate update button
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