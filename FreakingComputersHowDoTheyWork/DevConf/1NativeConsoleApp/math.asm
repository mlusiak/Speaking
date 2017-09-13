.386
PUBLIC _dumb_multiply
PUBLIC _smart_multiply

_CODE SEGMENT dword public 'CODE' use32
ASSUME CS:_CODE

_dumb_multiply PROC near
	push    ebp
	mov     ebp, esp   
	push	ebx
	
	mov		eax, [ebp+12]			;; second argument
	mov		ebx, [ebp+8]			;; first argument
	mov		edx, 0					;; initialize accumulator
	
	start:							;; loop
	add		edx, eax				;; add second number
	dec		ebx						;; decrease from first number
	jnz		start					;; iff ebx != o, jump to start

	mov		eax, edx

	pop		ebx
	pop		ebp
	ret
_dumb_multiply ENDP

_smart_multiply PROC near
	push    ebp
	mov     ebp, esp   
	push	ebx
	
	mov		eax, [ebp+12]			;; second argument
	mov		ebx, [ebp+8]			;; first argument
	
	imul	eax, ebx				;; multiplying; lower 32 bits -> eax; higher -> edx

	pop		ebx
	pop		ebp
	ret
_smart_multiply ENDP

_CODE ENDS
END