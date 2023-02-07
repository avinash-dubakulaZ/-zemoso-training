def pickodd(av):
    #checking for odd
    for i in range(len(av)):
        if av[i]%2!=0:
            ans=av.pop(i)
            return ans
    #no odd avaliable
    ans=av.pop()
    return ans
def pickeven(av):
    #checking for even
    for i in range(len(av)):
        if av[i]%2==0:
            ans=av.pop(i)
            return ans
    #no even avaliable
    ans=av.pop()
    return ans
for i in range(int(input())):
    tn=int(input())
    l=[int(i) for i in input().split()]
    ec=0
    oc=0
    t="a"
    for i in l:
        if i%2==0:
            ec+=1
        else:
            oc+=1
    
    oc=oc%4
    s=0
    av=[1 for i in range(oc)]
    if ec%2!=0:
        av=av+[2]
    while(len(av)!=0):
        if t=="a" and s%2!=0:
            s=s+pickodd(av)
            t="b"
        elif t=="a" and s%2==0:
            if oc>1 and oc%2!=0:
                s=s+pickodd(av)
                t="b"
            else:
                s=s+pickeven(av)
                t="b"
        elif(t=="b" and s%2!=0):
            pickodd(av)
            t="a"
        elif(t=="b" and s%2==0):
            pickeven(av)
            t="a"
        else:
            print("default something is missing")
    if(s%2==0):
        print("Alice")
    else:
        print("Bob")
        
