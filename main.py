import random

from fastapi import FastAPI, HTTPException

# Initialize the FastAPI application
app = FastAPI()

# Sample inventory of AI software products
PRODUCTS = [
    {
        "item_id": 1,
        "name": "ChatGPT",
        "category": "Conversational AI",
        "description": "Conversational AI assistant built on a large language model.",
        "pricing": {"amount": 20, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 2,
        "name": "Claude",
        "category": "Conversational AI",
        "description": "LLM assistant focused on helpful, honest, and safe conversations.",
        "pricing": {"amount": 20, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 3,
        "name": "GitHub Copilot",
        "category": "Code Generation",
        "description": "AI pair programmer that suggests code completions inside the editor.",
        "pricing": {"amount": 10, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 4,
        "name": "Midjourney",
        "category": "Image Generation",
        "description": "AI image generation from text prompts.",
        "pricing": {"amount": 30, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 5,
        "name": "Perplexity",
        "category": "AI Search",
        "description": "AI-powered answer engine for research and discovery.",
        "pricing": {"amount": 20, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 6,
        "name": "Jasper",
        "category": "Content Generation",
        "description": "AI content creation platform for marketing and enterprise content.",
        "pricing": {"amount": 44, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 7,
        "name": "ElevenLabs",
        "category": "Speech Synthesis",
        "description": "AI voice generation and text-to-speech.",
        "pricing": {"amount": 5, "currency": "USD", "period": "per month"},
    },
    {
        "item_id": 8,
        "name": "Runway",
        "category": "Video Generation",
        "description": "AI video creation and editing platform.",
        "pricing": {"amount": 15, "currency": "USD", "period": "per month"},
    },
]


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
    Returns a product from the AI software inventory based on an item ID.
    :param item_id: The ID of the product to retrieve.
    :param q: Optional query string used to filter products by name or description.
    """
    product = next(
        (
            product
            for product in PRODUCTS
            if product["item_id"] == item_id
            and (
                not q
                or q.lower() in product["name"].lower()
                or q.lower() in product["description"].lower()
            )
        ),
        None,
    )

    if product is None:
        raise HTTPException(status_code=404, detail=f"Product with item_id {item_id} not found")

    return product


@app.get("/random")
def get_random():
    """
    Returns a random number.
    """
    return {"random": random.randint(0, 100)}

