#pragma once

int multiply(int a, int b);

#ifdef MY2NATIVELIBRARY_EXPORTS
#define MY2NATIVELIBRARY_API __declspec(dllexport)
#else
#define MY2NATIVELIBRARY_API __declspec(dllimport)
#endif

MY2NATIVELIBRARY_API int axb(int a, int x, int b);