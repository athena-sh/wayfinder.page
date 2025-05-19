#!/usr/bin/env python3

# python3 gen_redirects.py > _redirects

import pathlib

blog_root = pathlib.Path("blog")
for dir in blog_root.iterdir():
    if dir.is_dir():
        slug = dir.name
        print(f"/{slug} /blog/{slug} 301!")
        print(f"/{slug}/ /blog/{slug}/ 301!")

