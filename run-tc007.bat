@echo off
cd /d c:\Users\chitr\qa-online-shop-zcqxxx
node_modules\.bin\playwright.cmd test tests/cart/tc007_inventory_list.spec.js
pause
