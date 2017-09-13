#include <stdio.h>
#include "console.h"

int main(int argc, char *argv[]) {
	int dumb_prod;
	int smart_prod;
	
	int a = 7;
	int b = 3;

	dumb_prod = dumb_multiply(a, b);
	smart_prod = smart_multiply(a, b);

	return 0;
}