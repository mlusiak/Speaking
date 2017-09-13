.386
PUBLIC _multiply

_CODE SEGMENT dword public 'CODE' use32
ASSUME CS:_CODE

_multiply PROC near
	push    ebp
	mov     ebp, esp   
	push	ebx
	
	mov		eax, [ebp+12]			;; second argument
	mov		ebx, [ebp+8]			;; first argument
	
	imul	eax, ebx				;; multiplying; lower 32 bits -> eax; higher -> edx
	add	    eax, 1000				;; for shit and giggles

	pop		ebx
	pop		ebp
	ret
_multiply ENDP

_CODE ENDS
END