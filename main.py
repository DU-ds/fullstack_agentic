import random

from fastapi import FastAPI

# Initialize the FastAPI application
app = FastAPI()


# Define a route (endpoint)
@app.get("/")
def read_root():
    """
    Returns a welcome message when accessing the root URL (/).
    """
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    """
    Returns a message based on an item ID.
    :param item_id: The ID of the item to retrieve.
    :param q: Optional query parameter.
    """
    return {"item_id": item_id, "q": q}


@app.get("/random")
def get_random():
    """
    Returns a random number.
    """
    return {"random": random.randint(0, 100)}

