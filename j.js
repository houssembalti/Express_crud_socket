

app.get('/sortByField/:field', (req, res) => {
    const field = req.params.field;
    const sortOptions = {};

    sortOptions[field] = 1;

    Produit.find({}, (err, produits) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving products from database');
        } else if (!produits) {
            res.status(404).send('No products found in database');
        } else {
            // Emit a 'notification' event with the message to be sent
            io.emit('notification', { message: `Products sorted by ${field} `});

            produits.sort((a, b) => {
                if (a[field] < b[field]) {
                    return -1;
                } else if (a[field] > b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            });

            res.send(produits);
        }
    }).sort(sortOptions);

});