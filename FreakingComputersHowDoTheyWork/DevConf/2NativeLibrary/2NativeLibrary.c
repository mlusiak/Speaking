// 2NativeLibrary.cpp : Defines the exported functions for the DLL application.
//

#include <stdio.h>
#include "2NativeLibrary.h"


MY2NATIVELIBRARY_API int axb(int a, int x, int b) {

	int ax = multiply(a, x);

	return ax + b;
}
