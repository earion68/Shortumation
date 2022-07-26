# -*- coding: utf-8 -*-
import setuptools  # type: ignore

setuptools.setup(
    python_requires=">=3.9",
    install_requires=[
        "PyYAML==6.0",
        "fastapi==0.78.0",
        "pydantic==1.9.1",
        "hypercorn==0.13.2",
        "python-decouple==3.6",
        "websockets==10.3"
    ],
    extras_require={
        "dev": [
            "mypy==0.961",
            "mypy-extensions==0.4.3",
            "black==22.6.0",
            "bandit==1.7.4",
            "isort==5.10.1",
            "coverage==6.4.2",
            "pre-commit==2.19.0",
            "vulture==2.5",
            "types-requests==2.28.0",
            "types-PyYAML==6.0.9",
            "requests==2.28.1",
        ],
    },
)
