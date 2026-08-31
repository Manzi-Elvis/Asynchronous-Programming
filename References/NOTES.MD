- JavaScript Foundations
    - **JavaScript itself vs the environment**
        
        This distinction becomes **very important** when learning asynchronous JavaScript.
        
        JavaScript is the language.
        
        The environment in which JavaScript runs provides additional capabilities.
        
        For example, a browser provides things such as:
        
        ```jsx
        setTimeout()
        fetch()
        document
        localStorage
        addEventListener()
        ```
        
        Node.js provides other capabilities such as:
        
        ```jsx
        fs
        http
        process
        Buffer
        ```
        
        So when we say:
        
        > "JavaScript can use **`setTimeout()`**"
        > 
        
        technically, **`setTimeout()`** is not a core JavaScript language feature. It is provided by the environment.
        
        This distinction becomes extremely important when we study:
        
        - Web APIs
        - The event loop
        - Timers
        - **`fetch()`**
        - Node.js
        - Asynchronous JavaScript
    - **How JavaScript Executes Code**
        
        Let's start with something extremely simple:
        
        ```jsx
        console.log("Hello");
        console.log("World");
        ```
        
        JavaScript executes the code from top to bottom.
        
        The result is:
        
        ```
        Hello
        World
        ```
        
        We can think of it as:
        
        ```
        Start
          ↓
        console.log("Hello")
          ↓
        console.log("World")
          ↓
        Finish
        ```
        
        This is called **synchronous execution**.
        
        ## **What does synchronous mean?**
        
        Synchronous means:
        
        > **Do one thing, then move to the next thing.**
        > 
        
        Imagine you are in a line at a restaurant.
        
        Person 1 orders.
        
        The restaurant handles Person 1.
        
        Only after that can Person 2 place their order.
        
        ```
        Person 1
           ↓
        Finish
           ↓
        Person 2
           ↓
        Finish
        ```
        
        JavaScript normally executes individual pieces of code this way.
        
        ---
        
        ## **JavaScript is single-threaded**
        
        One of the most important concepts in JavaScript is:
        
        > **JavaScript code is generally executed by one main thread at a time.**
        > 
        
        A thread is basically a path of execution.
        
        Imagine a person who can perform only one task at a time:
        
        ```
        Task A → Task B → Task C
        ```
        
        They cannot execute Task A and Task B at exactly the same moment.
        
        This is why JavaScript needs mechanisms for handling operations that take time.
        
        For example:
        
        ```jsx
        console.log("Start");
        
        someVerySlowOperation();
        
        console.log("End");
        ```
        
        If **`someVerySlowOperation()`** completely blocked the JavaScript thread, nothing else could execute while it was running.
        
        This is where asynchronous programming becomes important.
        
        But before we get there, we need to understand what JavaScript is actually doing with our code.
        
    - **Values, Variables & Functions**
        
        ## **Values**
        
        A value is simply **some piece of data**.
        
        Examples:
        
        ```jsx
        42
        "Hello"
        true
        false
        null
        undefined
        ```
        
        Objects are also values:
        
        ```jsx
        { name: "John" }
        ```
        
        Arrays are values:
        
        ```jsx
        [1, 2, 3]
        ```
        
        Functions are values too:
        
        ```jsx
        function sayHello() {
          console.log("Hello");
        }
        ```
        
        This is important:
        
        > **In JavaScript, functions are values.**
        > 
        
        That means we can store them in variables, pass them to other functions, and return them from functions.
        
        ---
        
        # **4. Variables**
        
        A variable gives a name to a value.
        
        ```jsx
        const age = 25;
        ```
        
        You can think of this as:
        
        ```
        age ─────→ 25
        ```
        
        Now JavaScript can use the name **`age`** to access that value.
        
        ```jsx
        console.log(age);
        ```
        
        Output:
        
        ```
        25
        ```
        
        JavaScript has three common ways to declare variables:
        
        ```jsx
        const
        let
        var
        ```
        
        For modern JavaScript, you will usually use:
        
        ```jsx
        const
        ```
        
        and
        
        ```jsx
        let
        ```
        
        Example:
        
        ```jsx
        const name = "Alice";
        
        let age= 20;
        
        age= 21;
        ```
        
        **`const`** means the variable cannot be reassigned.
        
        ```jsx
        const age = 20;
        
        age= 21;// Error
        ```
        
        **`let`** allows reassignment:
        
        ```jsx
        let age= 20;
        
        age= 21;// Fine
        ```
        
        ---
        
        # **5. Functions**
        
        A function is a reusable piece of code.
        
        ```jsx
        function greet() {
          console.log("Hello!");
        }
        ```
        
        Defining the function does not mean the code inside immediately runs.
        
        We have created the function.
        
        To execute it, we call it:
        
        ```jsx
        greet();
        ```
        
        Think of a function as a machine:
        
        ```
               Input
                 ↓
            ┌──────────┐
            │ FUNCTION │
            └──────────┘
                 ↓
               Output
        ```
        
        For example:
        
        ```jsx
        function add(a, b) {
          return a+ b;
        }
        ```
        
        Calling it:
        
        ```jsx
        const result = add(2, 3);
        ```
        
        The function receives:
        
        ```
        a = 2
        b = 3
        ```
        
        Then:
        
        ```jsx
        a+ b
        ```
        
        becomes:
        
        ```jsx
        2 + 3
        ```
        
        and the function returns:
        
        ```
        5
        ```
        
        So:
        
        ```jsx
        const result = add(2, 3);
        ```
        
        produces:
        
        ```
        result → 5
        ```
        
    - **Objects & References**
        
        Objects are extremely important in JavaScript.
        
        An object lets us group related data together.
        
        ```jsx
        const person = {
          name: "Alice",
          age: 25
        };
        ```
        
        We can access the data:
        
        ```jsx
        person.name;
        ```
        
        Result:
        
        ```
        "Alice"
        ```
        
        And:
        
        ```jsx
        person.age;
        ```
        
        Result:
        
        ```
        25
        ```
        
        ---
        
        ## **Primitive values vs objects**
        
        JavaScript values can broadly be thought of as:
        
        ### **Primitive values**
        
        Examples:
        
        ```jsx
        string
        number
        boolean
        undefined
        null
        bigint
        symbol
        ```
        
        ### **Objects**
        
        Examples:
        
        ```jsx
        object
        array
        function
        date
        map
        set
        ```
        
        The distinction becomes important because objects are handled through **references**.
        
        ---
        
        # **What is a Reference?**
        
        Consider:
        
        ```jsx
        const person = {
          name: "Alice"
        };
        ```
        
        It is useful to imagine that the object lives somewhere in memory.
        
        Conceptually:
        
        ```
        person
           │
           │ reference
           ↓
        ┌───────────────┐
        │ name: "Alice" │
        └───────────────┘
        ```
        
        The variable doesn't conceptually contain the entire object itself.
        
        It contains a way to reach the object.
        
        Now:
        
        ```jsx
        const anotherPerson = person;
        ```
        
        We now have:
        
        ```
        person ─────────┐
                        ↓
                   ┌───────────────┐
                   │ name: "Alice" │
                   └───────────────┘
                        ↑
        anotherPerson ──┘
        ```
        
        Both variables refer to the same object.
        
        Therefore:
        
        ```jsx
        anotherPerson.name= "Bob";
        ```
        
        Now:
        
        ```jsx
        console.log(person.name);
        ```
        
        prints:
        
        ```
        Bob
        ```
        
        Why?
        
        Because there was only one object.
        
        Both variables were pointing to it.
        
    - **Execution Context**
        
        Now we reach one of the most important concepts for understanding JavaScript.
        
        ## **What is an execution context?**
        
        An **execution context** is the environment in which JavaScript executes code.
        
        A useful beginner-friendly definition is:
        
        > **An execution context is JavaScript's working environment for running a particular piece of code.**
        > 
        
        It contains information JavaScript needs while executing that code.
        
        For example:
        
        - Variables
        - Functions
        - Scope information
        - The value of **`this`**
        - References to surrounding environments
        
        There are different kinds of execution contexts.
        
        The two most important for now are:
        
        ### **Global execution context**
        
        Created when JavaScript starts running a script.
        
        ### **Function execution context**
        
        Created when a function is called.
        
        ---
        
        ## **Example**
        
        ```jsx
        const name = "Alice";
        
        function greet() {
          const message = "Hello";
          console.log(message);
        }
        
        greet();
        ```
        
        When JavaScript starts, it creates a global execution context.
        
        Conceptually:
        
        ```
        GLOBAL EXECUTION CONTEXT
        ────────────────────────
        
        name → "Alice"
        greet → function
        ```
        
        Then:
        
        ```jsx
        greet();
        ```
        
        calls the function.
        
        JavaScript creates another execution context:
        
        ```
        FUNCTION EXECUTION CONTEXT
        ───────────────────────────
        
        message → "Hello"
        ```
        
        So we temporarily have:
        
        ```
        Global Context
              ↓
        Function Context
        ```
        
        When the function finishes, its execution context is removed from the call stack.
        
    - **Call Stack**
        
        The **call stack** is one of the most important concepts in JavaScript.
        
        A stack works like a stack of plates.
        
        If you put plates on top of each other:
        
        ```
             ┌───────┐
             │Plate 3│ ← last added
             ├───────┤
             │Plate 2│
             ├───────┤
             │Plate 1│
             └───────┘
        ```
        
        You remove the top plate first.
        
        This is called:
        
        > **LIFO — Last In, First Out**
        > 
        
        JavaScript's call stack works similarly.
        
        ---
        
        ## **Example**
        
        ```jsx
        function one() {
          two();
        }
        
        function two() {
          three();
        }
        
        function three() {
          console.log("Hello");
        }
        
        one();
        ```
        
        JavaScript starts with:
        
        ```
        one()
        ```
        
        The call stack becomes:
        
        ```
        ┌──────────┐
        │ one()    │
        └──────────┘
        ```
        
        Then **`one()`** calls **`two()`**:
        
        ```
        ┌──────────┐
        │ two()    │
        ├──────────┤
        │ one()    │
        └──────────┘
        ```
        
        Then **`two()`** calls **`three()`**:
        
        ```
        ┌──────────┐
        │ three()  │
        ├──────────┤
        │ two()    │
        ├──────────┤
        │ one()    │
        └──────────┘
        ```
        
        Then **`three()`** finishes.
        
        It is removed:
        
        ```
        ┌──────────┐
        │ two()    │
        ├──────────┤
        │ one()    │
        └──────────┘
        ```
        
        Then **`two()`** finishes.
        
        ```
        ┌──────────┐
        │ one()    │
        └──────────┘
        ```
        
        Then **`one()`** finishes.
        
        ```
        empty
        ```
        
        ---
        
        # **10. Why the Call Stack Matters**
        
        The call stack tells JavaScript:
        
        > **What code am I currently executing?**
        > 
        
        This becomes extremely important when asynchronous JavaScript enters the picture.
        
        For example, if JavaScript is executing:
        
        ```jsx
        function a() {
          b();
        }
        
        function b() {
          c();
        }
        
        function c() {
          console.log("Hello");
        }
        ```
        
        the call stack keeps track of where JavaScript currently is.
        
        If JavaScript encounters an error, the stack can also help show **how the code got there**.
        
        That's why error messages often contain something called a **stack trace**.
        
    - **Heap**
        
        The **heap** is an area of memory where JavaScript can store dynamically allocated data, especially objects and functions.
        
        For example:
        
        ```jsx
        const person = {
          name: "Alice",
          age: 25
        };
        ```
        
        A simplified mental model is:
        
        ```
        CALL STACK                  HEAP
        
        person ───────────────────→ { name: "Alice",
                                       age: 25 }
        ```
        
        Important:
        
        > This is a simplified model.
        > 
        
        The JavaScript specification does not require implementations to literally organize memory exactly this way.
        
        Different JavaScript engines have different internal implementations.
        
        For learning purposes, however, thinking about:
        
        ```
        Stack = currently executing work
        Heap  = memory for dynamically allocated data
        ```
        
        is useful.
        
    - Scope
        
        Scope answers this question:
        
        > **Where can I access this variable?**
        > 
        
        Example:
        
        ```jsx
        const name = "Alice";
        
        function greet() {
          console.log(name);
        }
        
        greet();
        ```
        
        The function can access **`name`**.
        
        But:
        
        ```jsx
        function greet() {
          const message = "Hello";
        }
        
        console.log(message);
        ```
        
        doesn't work.
        
        Why?
        
        Because **`message`** exists inside the function's scope.
        
        It isn't available outside.
        
        ---
        
        ## **Global scope**
        
        ```jsx
        const name = "Alice";
        ```
        
        **`name`** is available in the surrounding/global scope.
        
        ---
        
        ## **Function scope**
        
        ```jsx
        function greet() {
          const message = "Hello";
        }
        ```
        
        **`message`** exists inside the function.
        
        ---
        
        ## **Block scope**
        
        **`let`** and **`const`** are block-scoped.
        
        A block is commonly created using **`{}`**.
        
        ```jsx
        if (true) {
          const message = "Hello";
        }
        
        console.log(message);
        ```
        
        This produces an error because **`message`** only exists inside the block.
        
        ---
        
    - Lexical Environment
        
        The term **lexical environment** sounds complicated, but the basic idea is manageable.
        
        A lexical environment is the structure JavaScript uses to keep track of:
        
        - Variables
        - Functions
        - Bindings
        - The connection to an outer environment
        
        For example:
        
        ```jsx
        const name = "Alice";
        
        function greet() {
          const message = "Hello";
        
          console.log(name);
        }
        ```
        
        Conceptually:
        
        ```
        Global Lexical Environment
        │
        ├── name → "Alice"
        │
        └── greet → function
               │
               ↓
           Function Lexical Environment
           │
           └── message → "Hello"
        ```
        
        The function's environment has a connection to its outer environment.
        
        That connection allows this:
        
        ```jsx
        console.log(name);
        ```
        
        even though **`name`** wasn't declared inside **`greet()`**.
        
        JavaScript searches outward.
        
        ---
        
        # **14. Scope Chain**
        
        Suppose we have:
        
        ```jsx
        const a = 10;
        
        function outer() {
          const b = 20;
        
          function inner() {
            const c = 30;
        
            console.log(a);
            console.log(b);
            console.log(c);
          }
        
          inner();
        }
        
        outer();
        ```
        
        When **`inner()`** looks for **`c`**:
        
        ```
        inner scope
            ↓
        c found
        ```
        
        When it looks for **`b`**:
        
        ```
        inner scope
            ↓
        outer scope
            ↓
        b found
        ```
        
        When it looks for **`a`**:
        
        ```
        inner scope
            ↓
        outer scope
            ↓
        global scope
            ↓
        a found
        ```
        
        This is essentially the **scope chain**.
        
        JavaScript searches the current environment first.
        
        If it doesn't find the variable, it moves outward.
        
    - Hoisting
        
        Hoisting is one of the most misunderstood JavaScript concepts.
        
        A simple explanation is:
        
        > **Before executing code, JavaScript creates the bindings it needs for declarations in the relevant scope.**
        > 
        
        But different declarations behave differently.
        
        ---
        
        ## **`var`**
        
        Consider:
        
        ```jsx
        console.log(age);
        
        var age= 25;
        ```
        
        You might expect an error.
        
        Instead, the result is:
        
        ```
        undefined
        ```
        
        A useful simplified mental model is:
        
        ```jsx
        var age;
        
        console.log(age);
        
        age= 25;
        ```
        
        The declaration is available before the assignment.
        
        ---
        
        ## **`let` and `const`**
        
        Now:
        
        ```jsx
        console.log(age);
        
        let age= 25;
        ```
        
        This causes an error.
        
        The same applies to:
        
        ```jsx
        console.log(age);
        
        const age = 25;
        ```
        
        Why?
        
        Because **`let`** and **`const`** declarations are created during environment setup, but they cannot be accessed before their declaration is evaluated.
        
        This period is called the:
        
        > **Temporal Dead Zone (TDZ)**
        > 
        
        So:
        
        ```jsx
        console.log(age);
        
        let age= 25;
        ```
        
        is effectively trying to access **`age`** while it is still in its TDZ.
        
        ---
        
        ## **Function declarations**
        
        Function declarations behave differently:
        
        ```jsx
        greet();
        
        function greet() {
          console.log("Hello");
        }
        ```
        
        This works.
        
        The function declaration is available before the line where it appears.
        
    - Closures
        
        Closures are one of the most important concepts in JavaScript.
        
        They are also extremely important for understanding asynchronous JavaScript.
        
        A closure happens when a function **remembers variables from the environment where it was created**, even after that outer function has finished executing.
        
        Let's look at an example.
        
        ```jsx
        function createCounter() {
          let count= 0;
        
          function increment() {
            count++;
            console.log(count);
          }
        
          return increment;
        }
        ```
        
        Now:
        
        ```jsx
        const counter = createCounter();
        ```
        
        **`createCounter()`** has finished.
        
        Normally, you might think:
        
        > "The **`count`** variable should disappear."
        > 
        
        But:
        
        ```jsx
        counter();
        ```
        
        prints:
        
        ```
        1
        ```
        
        Then:
        
        ```jsx
        counter();
        ```
        
        prints:
        
        ```
        2
        ```
        
        And:
        
        ```jsx
        counter();
        ```
        
        prints:
        
        ```
        3
        ```
        
        How is this possible?
        
        Because **`increment()`** has a closure over **`count`**.
        
        Conceptually:
        
        ```
        createCounter()
              │
              ├── count → 0
              │
              └── increment()
                     │
                     │ remembers
                     ↓
                   count
        ```
        
        Even though **`createCounter()`** has finished, the returned function still has access to the variable it closed over.
        
        ---
        
        # **17. Why Closures Matter for Asynchronous JavaScript**
        
        Closures become particularly useful when code runs later.
        
        For example:
        
        ```jsx
        function greetLater(name) {
          setTimeout(()=> {
            console.log("Hello " + name);
          }, 1000);
        }
        
        greetLater("Alice");
        ```
        
        The callback:
        
        ```jsx
        ()=> {
          console.log("Hello " + name);
        }
        ```
        
        uses **`name`**.
        
        Even though **`greetLater()`** has already returned by the time the callback runs, the callback still has access to **`name`**.
        
        That's closure behavior.
        
        This is one reason closures are so important when learning:
        
        - Callbacks
        - Timers
        - Promises
        - Event handlers
        - **`async/await`**
        
        ---
        
        # **🧠 The Big Picture**
        
        At this point, you should have a mental model something like this:
        
        ```
                             JAVASCRIPT
                                 │
                                 ↓
                         Executes JavaScript
                                 │
                                 ↓
                        Execution Context
                                 │
                      ┌──────────┴──────────┐
                      ↓                     ↓
                   Variables             Functions
                      │                     │
                      ↓                     ↓
               Lexical Environment     Function calls
                                              │
                                              ↓
                                        Call Stack
        ```
        
        And memory can be visualized approximately as:
        
        ```
                     JAVASCRIPT RUNTIME
                            │
                  ┌─────────┴─────────┐
                  ↓                   ↓
             Call Stack              Heap
                  │                   │
                  │                   │
           Current execution      Objects/data
        ```
        
        Scope determines:
        
        ```
        "What variables can I access?"
        ```
        
        The lexical environment helps JavaScript keep track of those variables.
        
        The scope chain allows JavaScript to search outward.
        
        Closures allow functions to retain access to variables from their surrounding lexical environment.
        
        And the call stack keeps track of what JavaScript is currently executing.
        
    - **🔑 The Most Important Things to Remember**
        
        ### **1. JavaScript is a programming language**
        
        It provides the language itself, while environments such as browsers and Node.js provide additional capabilities.
        
        ### **2. JavaScript executes code**
        
        Normally, JavaScript executes one piece of JavaScript code at a time on its main execution thread.
        
        ### **3. Values are data**
        
        Examples:
        
        ```jsx
        42
        "hello"
        true
        {}
        []
        ```
        
        ### **4. Functions are values**
        
        You can:
        
        ```jsx
        const fn = function () {};
        ```
        
        pass functions around:
        
        ```jsx
        someFunction(fn);
        ```
        
        and return functions:
        
        ```jsx
        return fn;
        ```
        
        ### **5. Objects are accessed through references**
        
        Two variables can refer to the same object.
        
        ### **6. An execution context is JavaScript's environment for executing code**
        
        It contains the information needed to execute that code.
        
        ### **7. The call stack tracks active execution**
        
        It works approximately like:
        
        ```
        Last In → First Out
        ```
        
        ### **8. Scope determines where variables can be accessed**
        
        ### **9. Lexical environments hold variable bindings and connections to outer environments**
        
        ### **10. Hoisting is about how declarations are handled during environment setup**
        
        **`var`**, **`let`**, **`const`**, and function declarations behave differently.
        
        ### **11. Closures allow functions to remember their surrounding variables**
        
        This becomes extremely important when functions execute later.
        
        ---
        
        # **🚦 Why We Need All of This for Asynchronous JavaScript**
        
        Now we're ready to approach the real problem.
        
        Imagine:
        
        ```jsx
        console.log("Start");
        
        setTimeout(()=> {
          console.log("Finished!");
        }, 2000);
        
        console.log("End");
        ```
        
        What happens?
        
        The output is:
        
        ```
        Start
        End
        Finished!
        ```
        
        But why?
        
        If JavaScript executes code from top to bottom, why didn't it wait for the timer?
        
        To answer that, we need to understand something beyond just the JavaScript language:
        
        ```
        JavaScript
            +
        JavaScript Runtime
            +
        Web APIs / Node APIs
            +
        Task Queues
            +
        Microtask Queue
            +
        Event Loop
        ```
        
        That is where **asynchronous JavaScript** begins.
        
        And once we understand that machinery, Promises become much easier to understand.
        
- Synchronous JS
    - **What is Synchronous Execution?**
        
        Look at this:
        
        ```jsx
        console.log("A");
        console.log("B");
        console.log("C");
        ```
        
        JavaScript runs it like this:
        
        ```
        A → B → C
        ```
        
        It doesn't jump around.
        
        It doesn't start **`C`** while **`A`** is still running.
        
        Each piece of code must finish before the next one gets its turn.
        
        ### **Think of it like a cashier 🧑‍💼**
        
        One customer is being served.
        
        ```
        Customer 1
           ↓
        Finished
           ↓
        Customer 2
           ↓
        Finished
           ↓
        Customer 3
        ```
        
        That's synchronous execution.
        
    - Blocking
        
        Here's where synchronous execution can become a problem.
        
        Imagine:
        
        ```jsx
        console.log("Start");
        
        doSomethingVerySlow();
        
        console.log("End");
        ```
        
        If **`doSomethingVerySlow()`** takes 10 seconds, JavaScript waits.
        
        ```
        Start
          ↓
        🐌 Slow operation
          ↓
        10 seconds...
          ↓
        End
        ```
        
        During that time, the JavaScript thread is blocked from continuing with other JavaScript work.
        
        ### **Blocking means:**
        
        > **Something prevents JavaScript from moving forward.**
        > 
        
        This can make an application feel frozen.
        
        For example, imagine clicking a button and the page doesn't respond for several seconds.
        
        That's bad user experience.
        
    - Call-stack in Action
        
        Remember the **call stack** from the previous section?
        
        It's where JavaScript keeps track of what it's currently executing.
        
        Example:
        
        ```jsx
        function first() {
          second();
        }
        
        function second() {
          console.log("Hello");
        }
        
        first();
        ```
        
        When **`first()`** runs:
        
        ```
        ┌─────────┐
        │ first() │
        └─────────┘
        ```
        
        Then **`first()`** calls **`second()`**:
        
        ```
        ┌──────────┐
        │ second() │
        ├──────────┤
        │ first()  │
        └──────────┘
        ```
        
        **`second()`** finishes:
        
        ```
        ┌─────────┐
        │ first() │
        └─────────┘
        ```
        
        Then **`first()`** finishes:
        
        ```
        ┌───────┐
        │ empty │
        └───────┘
        ```
        
        ### **The rule:**
        
        > **Last function in → first function out.**
        > 
        
        That's why it's called a **stack**.
        
    - Execution Order
        
        JavaScript follows a predictable order.
        
        Consider:
        
        ```jsx
        console.log("1");
        
        function sayHello() {
          console.log("2");
        }
        
        console.log("3");
        
        sayHello();
        
        console.log("4");
        ```
        
        Output:
        
        ```
        1
        3
        2
        4
        ```
        
        Notice something interesting:
        
        Defining **`sayHello()`** didn't execute it.
        
        This:
        
        ```jsx
        function sayHello() {
          console.log("2");
        }
        ```
        
        **creates the function.**
        
        This:
        
        ```jsx
        sayHello();
        ```
        
        **runs the function.**
        
        So the execution is:
        
        ```
        console.log("1")
               ↓
        create function
               ↓
        console.log("3")
               ↓
        call sayHello()
               ↓
        console.log("2")
               ↓
        console.log("4")
        ```
        
        ---
        
        # **🧠 The Mental Model**
        
        For now, think:
        
        ```
        JavaScript code
              ↓
        Runs synchronously
              ↓
        One piece at a time
              ↓
        Call stack tracks the work
              ↓
        Finish current work
              ↓
        Move to next work
        ```
        
        This is perfectly fine when operations are fast.
        
        But what happens when JavaScript needs to wait for something?
        
        For example:
        
        ```jsx
        fetch("/users");
        ```
        
        or:
        
        ```jsx
        setTimeout(...);
        ```
        
        or:
        
        ```jsx
        readFile(...);
        ```
        
        Should JavaScript just sit there and wait?
        
        **No.**
        
        That's the problem asynchronous JavaScript was designed to solve.
        
- Asynchronous JS
    - What is Asynchronous programming?
        
        **Asynchronous = start something, don't wait for it, keep going, deal with the result later.**
        
        Synchronous:
        
        ```jsx
        doTask1();
        doTask2();
        ```
        
        JavaScript does:
        
        ```
        Task 1 → finish → Task 2
        ```
        
        Asynchronous:
        
        ```jsx
        doTask1();
        doTask2();
        ```
        
        If **`doTask1()`** involves waiting, JavaScript can arrange for it to finish later and continue with Task 2.
        
        ```
        Start Task 1
             ↓
        "Let me know when you're done."
             ↓
        Start Task 2
             ↓
        ...
        Task 1 finishes
             ↓
        Handle the result
        ```
        
        ### **The important idea**
        
        > **Asynchronous JavaScript isn't JavaScript doing two things at exactly the same time. It's JavaScript not getting stuck waiting.**
        > 
    - Why do we need it?
        
        Some operations take time:
        
        - Getting data from an API 🌐
        - Reading a file 📄
        - Waiting for a timer ⏱️
        - Talking to a database 🗄️
        - Waiting for user interaction 🖱️
        
        Imagine:
        
        ```jsx
        getDataFromServer();
        ```
        
        The server might take 2 seconds.
        
        If JavaScript simply waited:
        
        ```
        JavaScript
           ↓
        Request server
           ↓
        WAIT 2 seconds 😴
           ↓
        Continue
        ```
        
        the application could become unresponsive.
        
        Instead:
        
        ```
        Request server
             ↓
        Continue doing other work
             ↓
        ...
        Server responds
             ↓
        Handle response
        ```
        
        That's the whole motivation behind asynchronous programming.
        
    - Browser Runtime
        
        Here's a very important distinction:
        
        > **JavaScript itself doesn't magically perform asynchronous operations. The runtime helps it.**
        > 
        
        When JavaScript runs in a browser, you can think of the environment roughly like this:
        
        ```
        ┌─────────────────────────────┐
        │          Browser            │
        │                             │
        │  JavaScript Engine          │
        │  ┌───────────┐              │
        │  │Call Stack │              │
        │  └───────────┘              │
        │                             │
        │  Browser APIs               │
        │  ┌───────────┐              │
        │  │ Timers    │              │
        │  │ Network   │              │
        │  │ DOM       │              │
        │  └───────────┘              │
        │                             │
        │  Queues + Event Loop        │
        └─────────────────────────────┘
        ```
        
        The browser provides capabilities outside the JavaScript engine.
        
        This is how JavaScript can interact with things like:
        
        ```jsx
        setTimeout()
        fetch()
        document
        addEventListener()
        ```
        
    - Node.js Runtime
        
        JavaScript doesn't only run in browsers.
        
        It can also run using **Node.js**.
        
        Node provides a different runtime environment.
        
        ```
        Browser
        ├── JavaScript engine
        ├── DOM
        ├── Web APIs
        └── Browser event loop
        
        Node.js
        ├── JavaScript engine
        ├── Node APIs
        ├── File system
        ├── Networking
        └── Node event loop
        ```
        
        For example, Node can interact with files:
        
        ```jsx
        fs.readFile(...)
        ```
        
        or create servers:
        
        ```jsx
        http.createServer(...)
        ```
        
        So:
        
        > **JavaScript is the language. Browser and Node.js are environments that give JavaScript extra capabilities.**
        > 
    - Web APIs
        
        Web APIs are browser-provided features that JavaScript can use.
        
        Examples:
        
        ```jsx
        setTimeout()
        fetch()
        addEventListener()
        ```
        
        Consider:
        
        ```jsx
        setTimeout(()=> {
          console.log("Done!");
        }, 2000);
        ```
        
        The timer isn't sitting inside the call stack for two seconds.
        
        The browser handles the timer.
        
        Conceptually:
        
        ```
        JavaScript
           ↓
        setTimeout()
           ↓
        Browser handles timer ⏱️
           ↓
        JavaScript continues
           ↓
        2 seconds pass
           ↓
        Callback becomes ready
           ↓
        JavaScript eventually runs callback
        ```
        
        **Important:** The browser doesn't simply interrupt whatever JavaScript is currently running. The callback gets a chance to run when the appropriate queue/event-loop rules allow it.
        
        We'll dig into this later.
        
    - Event-Driven Programming
        
        JavaScript applications are often **event-driven**.
        
        An event is basically:
        
        > **Something happened.**
        > 
        
        Examples:
        
        ```
        User clicked
        User typed
        Timer finished
        Network response arrived
        File finished loading
        ```
        
        You can tell JavaScript:
        
        > "When this happens, run this function."
        > 
        
        Example:
        
        ```jsx
        button.addEventListener("click", ()=> {
          console.log("Clicked!");
        });
        ```
        
        You're not saying:
        
        > "Keep checking whether the button was clicked."
        > 
        
        You're saying:
        
        > "When a click happens, run this function."
        > 
        
        That function is called a **callback**.
        
        Callbacks become extremely important in asynchronous JavaScript.
        
    - AJAX
        
        You may see the term **AJAX** in older JavaScript tutorials.
        
        AJAX stands for:
        
        > **Asynchronous JavaScript and XML**
        > 
        
        The name is a little outdated.
        
        AJAX describes the technique of communicating with a server **without reloading the entire web page**.
        
        For example:
        
        ```
        Old websites:
        
        Click button
            ↓
        Send request
            ↓
        Reload entire page
        ```
        
        AJAX-style applications:
        
        ```
        Click button
            ↓
        Send request
            ↓
        Keep page running
            ↓
        Server responds
            ↓
        Update only what changed
        ```
        
        Today, this is commonly done with:
        
        ```jsx
        fetch()
        ```
        
        For example:
        
        ```jsx
        fetch("/users")
          .then(response=> response.json())
          .then(users=> {
            console.log(users);
          });
        ```
        
        Don't worry about understanding **`.then()`** yet.
        
        That's **Promises**.
        
        We'll get there.
        
    - Blocking vs Non-Blocking
        
        This distinction is crucial.
        
        ## **Blocking**
        
        Blocking means:
        
        > **Don't continue until this operation is finished.**
        > 
        
        Conceptually:
        
        ```
        Task A
          ↓
        WAIT 😴
          ↓
        Finish
          ↓
        Task B
        ```
        
        ---
        
        ## **Non-blocking**
        
        Non-blocking means:
        
        > **Start the operation and allow other work to continue while it finishes.**
        > 
        
        ```
        Start Task A
             ↓
        Continue
             ↓
        Task B
             ↓
        Task C
             ↓
        Task A finishes
             ↓
        Handle Task A result
        ```
        
        This is why asynchronous APIs are so useful.
        
        ---
        
        # **🧠 The Big Picture**
        
        The most important thing to understand is this:
        
        ```
                         JAVASCRIPT
                             │
                             ↓
                      Call Stack
                             │
                             ↓
               "I need something external."
                             │
                             ↓
                Browser / Node runtime
                             │
                             ↓
                  Handles the operation
                             │
                             ↓
                     Operation finishes
                             │
                             ↓
                      Queue / Event Loop
                             │
                             ↓
                      Call Stack
                             │
                             ↓
                     Callback executes
        ```
        
        And this is the key idea:
        
        > **The JavaScript engine executes JavaScript. The runtime provides mechanisms that allow JavaScript programs to work with operations that take time.**
        > 
        
        ### **One last distinction**
        
        **Asynchronous ≠ parallel.**
        
        Asynchronous programming means JavaScript doesn't have to block while waiting.
        
        Parallelism means multiple pieces of work are actually executing simultaneously.
        
        Those are different concepts.
        
        ---
        
        # **🔑 Remember**
        
        ```
        Synchronous
        → Do it
        → Wait
        → Continue
        
        Asynchronous
        → Start it
        → Don't wait
        → Continue
        → Handle result later
        ```
        
        Once this makes sense, the next question is obvious:
        
        > **If JavaScript doesn't wait, how does it know when to come back and handle the result?**
        > 
        
        That's where the **Event Loop, Task Queue, and Microtask Queue** come in.
        
- Callbacks
    - What is a Callback?
        
        > **A callback is a function you give to another function so it can run it later.**
        > 
        
        Callbacks are one of the foundations of asynchronous JavaScript.
        
        Remember:
        
        > Functions are values in JavaScript.
        > 
        
        So we can pass a function into another function.
        
        ```jsx
        function sayHello() {
          console.log("Hello!");
        }
        
        function execute(fn) {
          fn();
        }
        
        execute(sayHello);
        ```
        
        Output:
        
        ```
        Hello!
        ```
        
        Here:
        
        ```jsx
        sayHello
        ```
        
        is the **callback**.
        
        We gave **`sayHello`** to **`execute()`**, and **`execute()`** decided when to run it.
        
        ### **Simple mental model**
        
        ```
        Give me a function
               ↓
        I'll call it
               ↓
        when I need it
        ```
        
    - Synchronous Callbacks
        
        A callback doesn't automatically mean asynchronous.
        
        Look at:
        
        ```jsx
        [1, 2, 3].forEach(number=> {
          console.log(number);
        });
        ```
        
        The function:
        
        ```jsx
        number=> {
          console.log(number);
        }
        ```
        
        is a callback.
        
        But it runs **synchronously**.
        
        ```
        forEach()
           ↓
        callback(1)
           ↓
        callback(2)
           ↓
        callback(3)
           ↓
        finish
        ```
        
        Another example:
        
        ```jsx
        function calculate(a, b, callback) {
          const result = a+ b;
          callback(result);
        }
        
        calculate(2, 3, result=> {
          console.log(result);
        });
        ```
        
        The callback runs immediately as part of **`calculate()`**.
        
        > **Callback ≠ asynchronous.**
        > 
        
        A callback is simply a function passed somewhere to be called later or at a particular point.
        
    - Asynchronous Callbacks
        
        Now the interesting part.
        
        ```jsx
        setTimeout(()=> {
          console.log("Hello!");
        }, 1000);
        
        console.log("Done!");
        ```
        
        Output:
        
        ```
        Done!
        Hello!
        ```
        
        The callback:
        
        ```jsx
        ()=> {
          console.log("Hello!");
        }
        ```
        
        is asynchronous.
        
        Conceptually:
        
        ```
        setTimeout()
             ↓
        Timer starts ⏱️
             ↓
        JavaScript continues
             ↓
        "Done!"
             ↓
        Timer finishes
             ↓
        Callback eventually runs
        ```
        
        This is the basic pattern behind many older asynchronous APIs.
        
    - Error-First Callbacks
        
        Error-first callbacks are **a design pattern in Node.js and JavaScript where the first argument of a callback function is reserved for an error object**.
        
        Node.js popularized a common callback convention:
        
        ```jsx
        function(error, result) {
        }
        ```
        
        The first argument represents an error.
        
        The second represents the successful result.
        
        Example:
        
        ```jsx
        readFile("data.txt", (error, data)=> {
          if (error) {
            console.log("Something went wrong!");
            return;
          }
        
          console.log(data);
        });
        ```
        
        The pattern is:
        
        ```
        (error, result)
        ```
        
        If something fails:
        
        ```jsx
        callback(error, null);
        ```
        
        If it succeeds:
        
        ```jsx
        callback(null, result);
        ```
        
        So you usually see:
        
        ```jsx
        if (error) {
          // handle error
          return;
        }
        ```
        
        This convention is called an **error-first callback** or **Node-style callback**.
        
    - Callback Hell
        
        Callbacks become painful when asynchronous operations depend on each other.
        
        Imagine:
        
        ```jsx
        getUser(userId, user=> {
          getPosts(user.id, posts=> {
            getComments(posts[0].id, comments=> {
              getAuthor(comments[0].authorId, author=> {
                console.log(author);
              });
            });
          });
        });
        ```
        
        Now imagine 10 more operations.
        
        Your code starts looking like:
        
        ```
                ┌───────────────┐
                │               │
                │   callback    │
                │      ┌────────┴───────┐
                │      │                │
                │      │   callback     │
                │      │      ┌─────────┴───────┐
                │      │      │                 │
                │      │      │   callback      │
                │      │      │       ...       │
                └──────┴──────┴─────────────────┘
        ```
        
        This is commonly called **callback hell**.
        
        The problem isn't callbacks themselves.
        
        The problem is **deeply nested callbacks that make control flow difficult to read and maintain**.
        
        Promises were introduced partly to make this kind of asynchronous code easier to manage.
        
    - Inversion of Control
        
        **Inversion of Control (IoC)** is **a principle that shifts the control of program flow, object creation, and dependency management from your custom code to an external framework or container**
        
        This is a more subtle problem with callbacks.
        
        Consider:
        
        ```jsx
        doSomething(()=> {
          console.log("Done");
        });
        ```
        
        You're giving another function control over your callback.
        
        You're essentially saying:
        
        > "Here is my function. You decide when to call it."
        > 
        
        That's **inversion of control**.
        
        You normally control your own function:
        
        ```jsx
        function doSomething() {
          // I control what happens here
        }
        ```
        
        With a callback:
        
        ```jsx
        someLibrary(()=> {
          // The library decides when this runs
        });
        ```
        
        You don't necessarily know:
        
        - When it will run
        - Whether it will run
        - How many times it will run
        - Whether it will receive the correct data
        - Whether it will call you after an error
        
        For example, a badly written API could do:
        
        ```jsx
        function badFunction(callback) {
          callback();
          callback();
        }
        ```
        
        Now your callback runs twice.
        
        Promises solve some of these problems by giving you a standardized object representing the eventual result.
        
    - Callback Race Conditions
        
        A race condition is **a flaw in a system where the output depends on the messy timing or order of uncontrollable events**
        
        It happens when the result depends on which asynchronous operation finishes first.
        
        Example:
        
        ```jsx
        let result;
        
        setTimeout(()=> {
          result= "A";
        }, 100);
        
        setTimeout(()=> {
          result= "B";
        }, 50);
        ```
        
        Which value does **`result`** have?
        
        ```
        50ms  → B
        100ms → A
        ```
        
        So the final value is:
        
        ```
        A
        ```
        
        The operations are effectively racing.
        
        A more realistic example:
        
        ```jsx
        search("javascript", results=> {
          display(results);
        });
        
        search("javascript promises", results=> {
          display(results);
        });
        ```
        
        Suppose the second search finishes first:
        
        ```
        Search 1 ────────────────→ finishes
        Search 2 ───────→ finishes
        ```
        
        The older search might finish **after** the newer search and overwrite the UI with outdated results.
        
        This is a race condition.
        
        ---
        
        # **🧠 Why Callbacks Eventually Became Painful**
        
        Callbacks solved an important problem:
        
        > **"Tell me what to do when the operation finishes."**
        > 
        
        But large applications exposed problems:
        
        ```
        Callbacks
           ↓
        Nested callbacks
           ↓
        Callback hell
           ↓
        Hard error handling
           ↓
        Inversion of control
           ↓
        Race conditions
           ↓
        Promises 🚀
        ```
        
        Promises don't eliminate every asynchronous problem, but they provide a much cleaner way to represent and compose asynchronous results.
        
    - **🔑 Remember**
        
        **Callback:**
        
        ```jsx
        doSomething(()=> {
          // callback
        });
        ```
        
        **Synchronous callback:**
        
        ```jsx
        [1, 2, 3].forEach(()=> {});
        ```
        
        **Asynchronous callback:**
        
        ```jsx
        setTimeout(()=> {}, 1000);
        ```
        
        **Error-first callback:**
        
        ```jsx
        (error, result)=> {}
        ```
        
        **Callback hell:**
        
        > Too many nested callbacks.
        > 
        
        **Inversion of control:**
        
        > Someone else controls when your callback runs.
        > 
        
        **Race condition:**
        
        > The outcome depends on which asynchronous operation finishes first.
        > 
- Event Loop and Queues
    - Event Loop
        
        The **event loop** is like a manager that keeps checking: “Is there any work ready to be done?” JavaScript runs one piece of code at a time. When something takes time, like a network request or timer, JavaScript starts it and moves on instead of waiting. When that operation finishes, its callback is put in a queue, and the event loop eventually picks it up and runs it when the JavaScript thread is free.
        **The Event Loop is what allows JavaScript to handle work that finishes later without blocking the main thread.**
        
        Remember the problem:
        
        ```jsx
        console.log("Start");
        
        setTimeout(()=> {
          console.log("Timer");
        }, 0);
        
        console.log("End");
        ```
        
        Output:
        
        ```
        Start
        End
        Timer
        ```
        
        But why?
        
        Because **`setTimeout()`** doesn't put the callback directly onto the call stack.
        
        A simplified picture:
        
        ```
                      JavaScript
                          │
                          ↓
                     Call Stack
                          │
                          ↓
                  Runtime / Browser
                          │
                          ↓
                      Queue
                          │
                          ↓
                     Event Loop
                          │
                          ↓
                     Call Stack
        ```
        
        The **Event Loop** constantly checks whether JavaScript is ready to run queued work.
        
        A simplified rule is:
        
        > **If the call stack is empty, the event loop can move eligible queued work onto the stack.**
        > 
        
        That's the basic mechanism behind asynchronous JavaScript.
        
    - Task Queue
        
        Def: Task Queue is **a structural mechanism that stores asynchronous callbacks waiting to be executed**.
        
        Some asynchronous callbacks go into a **task queue**.
        
        Examples include callbacks from things such as:
        
        ```jsx
        setTimeout()
        setInterval()
        ```
        
        and certain browser events.
        
        Example:
        
        ```jsx
        console.log("A");
        
        setTimeout(()=> {
          console.log("B");
        }, 0);
        
        console.log("C");
        ```
        
        The flow is roughly:
        
        ```
        console.log("A")
              ↓
        "A"
        
        setTimeout()
              ↓
        Timer registered
        
        console.log("C")
              ↓
        "C"
        
        Timer becomes ready
              ↓
        Task queue
              ↓
        Event loop
              ↓
        Callback runs
              ↓
        "B"
        ```
        
        Output:
        
        ```
        A
        C
        B
        ```
        
        ### **Important**
        
        **`0`** does **not** mean:
        
        > "Run immediately."
        > 
        
        It means roughly:
        
        > "Don't run before this minimum delay; queue the callback when eligible."
        > 
        
        The callback still has to wait for the current JavaScript work to finish.
        
    - Microtask Queue
        
        Now we meet something even more important:
        
        > **The microtask queue.**
        > 
        
        Microtasks are generally processed **before the event loop moves on to another task**.
        
        Common sources include:
        
        ```jsx
        Promise.then()
        Promise.catch()
        Promise.finally()
        queueMicrotask()
        ```
        
        Example:
        
        ```jsx
        console.log("A");
        
        Promise.resolve().then(()=> {
          console.log("B");
        });
        
        console.log("C");
        ```
        
        Output:
        
        ```
        A
        C
        B
        ```
        
        Why?
        
        ```
        A
        ↓
        Promise callback scheduled as microtask
        ↓
        C
        ↓
        Current task finishes
        ↓
        Microtask runs
        ↓
        B
        ```
        
    - Promise Jobs
        
        Def: Promise jobs (microtasks) are small pieces of asynchronous work created by promises or `async/await` that run after the current synchronous code finishes and before tasks like `setTimeout`.
        When a Promise becomes settled and its reaction handlers are ready to run, those handlers are scheduled as **Promise jobs**.
        
        In modern JavaScript terminology, these are **microtasks**.
        
        Example:
        
        ```jsx
        Promise.resolve("Hello").then(value=> {
          console.log(value);
        });
        ```
        
        The **`.then()`** callback doesn't immediately execute.
        
        Instead, JavaScript schedules it as a microtask.
        
        ```
        Promise settles
              ↓
        .then() reaction
              ↓
        Microtask queue
              ↓
        Event loop processing
              ↓
        Callback executes
        ```
        
        This is one of the reasons Promises behave differently from timers.
        
    - Rendering
        
        **Def: Rendering** is the process of turning HTML, CSS, and JavaScript into the visual webpage you see on the screen.
        In a browser, there's another important piece:
        
        > **Rendering the page.**
        > 
        
        The browser needs opportunities to update what you see:
        
        ```
        JavaScript
           ↓
        Browser processes work
           ↓
        Rendering opportunity
           ↓
        Screen updates
        ```
        
        For example, JavaScript might change the DOM:
        
        ```jsx
        element.textContent= "Hello";
        ```
        
        The browser can then render that change to the screen.
        
        The exact scheduling of rendering is browser-dependent, so don't think of it as a simple guaranteed:
        
        ```
        task → render → task → render
        ```
        
        But the important idea is:
        
        > **The browser has to balance JavaScript work with rendering the page.**
        > 
        
        And this is another reason that huge amounts of synchronous JavaScript can make a page feel frozen.
        
    - Microtask vs Task
        
        This is **extremely important**.
        
        Consider:
        
        ```jsx
        console.log("1");
        
        setTimeout(()=> {
          console.log("2");
        }, 0);
        
        Promise.resolve().then(()=> {
          console.log("3");
        });
        
        console.log("4");
        ```
        
        Output:
        
        ```
        1
        4
        3
        2
        ```
        
        Why?
        
        ### **Step 1**
        
        ```jsx
        console.log("1");
        ```
        
        Output:
        
        ```
        1
        ```
        
        ### **Step 2**
        
        The timer is scheduled as a task.
        
        ```
        Task queue:
        [ timer ]
        ```
        
        ### **Step 3**
        
        The Promise callback is scheduled as a microtask.
        
        ```
        Microtask queue:
        [ Promise callback ]
        ```
        
        ### **Step 4**
        
        ```jsx
        console.log("4");
        ```
        
        Output:
        
        ```
        1
        4
        ```
        
        ### **Step 5**
        
        The current task finishes.
        
        Now the microtask queue is processed.
        
        ```
        3
        ```
        
        ### **Step 6**
        
        Only after the microtasks are handled can the next task run.
        
        ```
        2
        ```
        
        Final result:
        
        ```
        1
        4
        3
        2
        ```
        
        ### **The key rule**
        
        Think:
        
        ```
        Current JavaScript finishes
                ↓
        Process microtasks
                ↓
        Next task
                ↓
        Process microtasks
                ↓
        Next task
                ↓
        ...
        ```
        
        So:
        
        > **Microtasks generally get priority over the next task.**
        > 
        
        # **A More Complete Mental Model**
        
        Here's the simplified picture you should keep in your head:
        
        ```
                          ┌───────────────┐
                          │  Call Stack   │
                          └───────┬───────┘
                                  │
                             JavaScript
                                  │
                                  ↓
                        Current task finishes
                                  │
                                  ↓
                       ┌───────────────────┐
                       │ Microtask Queue   │
                       └─────────┬─────────┘
                                 │
                            Run microtasks
                                 │
                                 ↓
                          More microtasks?
                            ↙          ↘
                          Yes           No
                           │             │
                           └───→─────────┘
                                         ↓
                                   Next task
                                         │
                                         ↓
                                  Rendering may
                                  get an opportunity
        ```
        
        This isn't a complete specification-level model, but it's an excellent mental model for learning.
        
    - Event Loop Exercises
        
        Don't memorize the answers.
        
        **Predict first.**
        
        ---
        
        ## **Exercise 1**
        
        ```jsx
        console.log("A");
        
        setTimeout(()=> {
          console.log("B");
        }, 0);
        
        console.log("C");
        ```
        
        <details> <summary>Answer</summary>
        
        ```
        A
        C
        B
        ```
        
        The timer callback runs later as a task.
        
        </details>
        
        ---
        
        ## **Exercise 2**
        
        ```jsx
        console.log("A");
        
        Promise.resolve().then(()=> {
          console.log("B");
        });
        
        console.log("C");
        ```
        
        <details> <summary>Answer</summary>
        
        ```
        A
        C
        B
        ```
        
        The Promise handler runs as a microtask after the current task finishes.
        
        </details>
        
        ---
        
        ## **Exercise 3**
        
        ```jsx
        setTimeout(()=> {
          console.log("A");
        }, 0);
        
        Promise.resolve().then(()=> {
          console.log("B");
        });
        
        console.log("C");
        ```
        
        <details> <summary>Answer</summary>
        
        ```
        C
        B
        A
        ```
        
        Why?
        
        ```
        C
        ↓
        Microtask → B
        ↓
        Task → A
        ```
        
        ---
        
        ## **Exercise 4**
        
        Now try this one:
        
        ```jsx
        console.log("A");
        
        setTimeout(()=> {
          console.log("B");
        
          Promise.resolve().then(()=> {
            console.log("C");
          });
        }, 0);
        
        Promise.resolve().then(()=> {
          console.log("D");
        });
        
        console.log("E");
        ```
        
        **Pause here and predict the output.**
        
        <details> <summary>Answer</summary>
        
        ```
        A
        E
        D
        B
        C
        ```
        
        The first microtask (**`D`**) runs before the timer task (**`B`**).
        
        Then, while the timer task is running, it creates another microtask (**`C`**).
        
        That microtask runs before another task gets a chance.
        
        </details>
        
    - **🔑 The Rules to Remember**
        
        ### **Rule 1**
        
        JavaScript executes the current synchronous code first.
        
        ### **Rule 2**
        
        A timer callback doesn't jump onto the call stack immediately.
        
        ### **Rule 3**
        
        Promise handlers are scheduled as microtasks.
        
        ### **Rule 4**
        
        Microtasks are processed after the current task finishes and before the next task is processed.
        
        ### **Rule 5**
        
        Microtasks can create more microtasks.
        
        ```jsx
        Promise.resolve().then(()=> {
          Promise.resolve().then(()=> {
            // another microtask
          });
        });
        ```
        
        The queue keeps being processed until the microtask queue is empty.
        
        ### **Rule 6**
        
        **`setTimeout(..., 0)`** does **not** mean "run now."
        
        ### **Rule 7**
        
        Too much synchronous work or too many microtasks can prevent the browser from getting opportunities to render.
        
        ---
        
        # **🧠 The One Diagram to Remember**
        
        ```
                JavaScript starts running
                         │
                         ↓
                  ┌─────────────┐
                  │ Call Stack  │
                  └──────┬──────┘
                         │
                  Current task ends
                         │
                         ↓
               ┌──────────────────┐
               │ Microtask Queue  │
               └────────┬─────────┘
                        │
                  Empty the queue
                        │
                        ↓
               Browser may render
                        │
                        ↓
                   Next task
                        │
                        ↓
                  Repeat forever
        ```
        
        Once this clicks, Promises become **much easier** to understand.
        
        Because a Promise isn't just:
        
        > "Something asynchronous."
        > 
- Promises
    - What are Promises?
        
        > **A Promise is an object that represents the eventual result of an asynchronous operation.**
        > 
        
        Callbacks say:
        
        > "Run this function when you're done."
        > 
        
        Promises say:
        
        > **"Give me an object representing the result. I'll decide what to do with it."**
        > 
        
        Imagine ordering food 🍔.
        
        You place the order.
        
        The food isn't ready yet.
        
        You now have a promise:
        
        ```
        Order placed
            ↓
        ⏳ Waiting
            ↓
        Food ready
        ```
        
        The Promise represents the **eventual outcome**.
        
        It can eventually become:
        
        ```
        ✅ Success
        ```
        
        or:
        
        ```
        ❌ Failure
        ```
        
        Example:
        
        ```jsx
        const promise = fetch("/users");
        ```
        
        **`fetch()`** doesn't immediately give you the users.
        
        It gives you a Promise representing the future result.
        
    - Why Promises?
        
        Callbacks work:
        
        ```jsx
        getUser(user=> {
          console.log(user);
        });
        ```
        
        But with many operations:
        
        ```jsx
        getUser(user=> {
          getPosts(user, posts=> {
            getComments(posts, comments=> {
              // 😵
            });
          });
        });
        ```
        
        Promises let us write:
        
        ```jsx
        getUser()
          .then(user=> getPosts(user))
          .then(posts=> getComments(posts))
          .then(comments=> {
            console.log(comments);
          });
        ```
        
        Much easier to follow.
        
        Promises also give us:
        
        - A standard way to represent future results
        - Better error handling
        - Cleaner chaining
        - Protection against multiple settlements
        - Easy composition of multiple asynchronous operations
    - Promise States
        
        A Promise has three states:
        
        ```
                     ┌───────────┐
                     │  PENDING  │
                     └─────┬─────┘
                           │
                    ┌──────┴──────┐
                    ↓             ↓
               FULFILLED       REJECTED
                  ✅               ❌
        ```
        
        ## **Pending**
        
        The operation hasn't finished.
        
        ```
        ⏳ "I'm still waiting."
        ```
        
        ## **Fulfilled**
        
        The operation succeeded.
        
        ```
        ✅ "Here's your result."
        ```
        
        ## **Rejected**
        
        The operation failed.
        
        ```
        ❌ "Something went wrong."
        ```
        
        ### **Important**
        
        A Promise can settle only once.
        
        ```
        pending → fulfilled
        ```
        
        or:
        
        ```
        pending → rejected
        ```
        
        It cannot later change from fulfilled to rejected.
        
    - Creating Promises
        
        You can create a Promise with:
        
        ```jsx
        const promise = new Promise((resolve, reject)=> {
          // do something
        });
        ```
        
        **`resolve`** means:
        
        > **Success.**
        > 
        
        **`reject`** means:
        
        > **Failure.**
        > 
        
        Example:
        
        ```jsx
        const promise = new Promise((resolve, reject)=> {
          resolve("Success!");
        });
        ```
        
        The Promise becomes fulfilled.
        
        Or:
        
        ```jsx
        const promise = new Promise((resolve, reject)=> {
          reject("Something went wrong!");
        });
        ```
        
        The Promise becomes rejected.
        
        ---
        
        ## **A realistic example**
        
        ```jsx
        function getUser() {
          return new Promise((resolve, reject)=> {
            setTimeout(()=> {
              resolve({ name: "Alice" });
            }, 1000);
          });
        }
        ```
        
        The function immediately returns a Promise.
        
        The Promise starts pending:
        
        ```
        getUser()
           ↓
        Promise ⏳
           ↓
        1 second
           ↓
        resolve(user)
           ↓
        Promise ✅
        ```
        
    - Consuming Promises
        
        Creating a Promise and consuming one are different things.
        
        We **create**:
        
        ```jsx
        new Promise(...)
        ```
        
        We **consume**:
        
        ```jsx
        promise.then(...)
        ```
        
        Example:
        
        ```jsx
        getUser().then(user=> {
          console.log(user);
        });
        ```
        
        We're saying:
        
        > "When this Promise succeeds, run this function."
        > 
    - then()
        
        The most common Promise method is:
        
        ```jsx
        .then()
        ```
        
        Example:
        
        ```jsx
        getUser().then(user=> {
          console.log(user);
        });
        ```
        
        If the Promise fulfills, the callback runs.
        
        ```
        Promise
           ↓
        fulfilled
           ↓
        .then()
           ↓
        callback(user)
        ```
        
        ---
        
        ## **`then()` returns another Promise**
        
        This is **extremely important**.
        
        ```jsx
        const result = promise.then(value=> {
          return value* 2;
        });
        ```
        
        **`result`** is itself a Promise.
        
        That's what makes chaining possible.
        
        ```
        Promise A
           ↓
        .then()
           ↓
        Promise B
        ```
        
    - catch()
        
        **`catch()`** handles rejection.
        
        ```jsx
        getUser()
          .then(user=> {
            console.log(user);
          })
          .catch(error=> {
            console.log("Error:", error);
          });
        ```
        
        Think:
        
        ```
        Success → then()
        Failure → catch()
        ```
        
        You can think of:
        
        ```jsx
        .catch(handler)
        ```
        
        as roughly equivalent to:
        
        ```jsx
        .then(undefined, handler)
        ```
        
    - finally()
        
        **`finally()`** runs regardless of whether the Promise succeeds or fails.
        
        ```jsx
        getUser()
          .then(user=> {
            console.log(user);
          })
          .catch(error=> {
            console.log(error);
          })
          .finally(()=> {
            console.log("Finished!");
          });
        ```
        
        Useful for cleanup:
        
        ```
        Request starts
             ↓
        Success OR failure
             ↓
        Cleanup
        ```
        
        For example:
        
        - Hide a loading spinner
        - Close a resource
        - Reset UI state
        
        **`finally()`** doesn't receive the successful value or error as an argument.
        
    - Promise Chaining
        
        This is where Promises become powerful.
        
        ```jsx
        getUser()
          .then(user=> {
            return getPosts(user.id);
          })
          .then(posts=> {
            return getComments(posts[0].id);
          })
          .then(comments=> {
            console.log(comments);
          });
        ```
        
        Think of it like a pipeline:
        
        ```
        getUser()
           ↓
        user
           ↓
        getPosts()
           ↓
        posts
           ↓
        getComments()
           ↓
        comments
        ```
        
        The value returned from one **`.then()`** becomes the input to the next **`.then()`**.
        
        ---
        
        ## **Returning a normal value**
        
        ```jsx
        Promise.resolve(10)
          .then(value=> {
            return value* 2;
          })
          .then(value=> {
            console.log(value);
          });
        ```
        
        Output:
        
        ```
        20
        ```
        
        Conceptually:
        
        ```
        10
         ↓
        20
         ↓
        console.log(20)
        ```
        
        ---
        
        ## **Returning a Promise**
        
        This is where things get interesting.
        
        ```jsx
        getUser()
          .then(user=> {
            return getPosts(user.id);
          })
          .then(posts=> {
            console.log(posts);
          });
        ```
        
        The second **`.then()`** waits for the Promise returned by the first **`.then()`**.
        
        So:
        
        ```
        Promise A
           ↓
        .then()
           ↓
        returns Promise B
           ↓
        wait for B
           ↓
        next .then()
        ```
        
        This is called **Promise chaining**.
        
    - Error Propagation
        
        One of the best things about Promises is that errors can travel down the chain.
        
        ```jsx
        getUser()
          .then(user=> {
            throw new Error("Something went wrong");
          })
          .then(()=> {
            console.log("This won't run");
          })
          .catch(error=> {
            console.log(error.message);
          });
        ```
        
        The error travels down until something handles it.
        
        ```
        getUser()
           ↓
        then()
           ↓
        💥 error
           ↓
        skip next success handler
           ↓
        catch()
        ```
        
        This is much cleaner than manually passing errors through every callback.
        
    - Promise Resolution
        
        This is one of the most confusing Promise concepts.
        
        **`resolve()`** does **not simply mean**:
        
        > "Make this Promise fulfilled with whatever I give you."
        > 
        
        If you do:
        
        ```jsx
        resolve(10);
        ```
        
        the Promise fulfills with **`10`**.
        
        But:
        
        ```jsx
        resolve(anotherPromise);
        ```
        
        is different.
        
        The Promise effectively adopts the state/result of that Promise.
        
        Example:
        
        ```jsx
        const p = new Promise(resolve=> {
          resolve(
            new Promise(innerResolve=> {
              setTimeout(()=> {
                innerResolve("Hello");
              }, 1000);
            })
          );
        });
        ```
        
        The outer Promise doesn't immediately become fulfilled with the inner Promise object.
        
        It follows the inner Promise.
        
        ```
        Outer Promise
             ↓
        resolve(inner Promise)
             ↓
        follow inner Promise
             ↓
        ⏳
             ↓
        "Hello"
             ↓
        fulfilled
        ```
        
        This behavior is part of the **Promise Resolution Procedure**.
        
        You don't need to memorize the specification, but understand this:
        
        > **Promises can adopt the state of other Promise-like values.**
        > 
    - Thenables
        
        A **thenable** is an object that has a **`then`** method.
        
        It doesn't have to be an actual Promise.
        
        Example:
        
        ```jsx
        const thenable = {
          then(resolve) {
            resolve("Hello");
          }
        };
        ```
        
        It looks Promise-like because it has:
        
        ```jsx
        then(...)
        ```
        
        JavaScript's Promise machinery recognizes thenables.
        
        For example:
        
        ```jsx
        Promise.resolve(thenable)
        ```
        
        will interact with its **`then()`** method.
        
        This is called **thenable assimilation**.
        
        ### **Why does this matter?**
        
        It allows different Promise implementations and Promise-like libraries to interoperate.
        
        You don't normally need to create thenables yourself.
        
        Just remember:
        
        > **A thenable is an object with a callable `then` method.**
        > 
    - Promise Combinators
        
        Sometimes you have multiple Promises.
        
        ```jsx
        const a = fetch("/a");
        const b = fetch("/b");
        const c = fetch("/c");
        ```
        
        You need a way to combine them.
        
        That's what Promise combinators do.
        
        ---
        
        ## **`Promise.all()`**
        
        Use when:
        
        > **I need everything to succeed.**
        > 
        
        ```jsx
        Promise.all([a, b, c])
          .then(results=> {
            console.log(results);
          });
        ```
        
        If all succeed:
        
        ```
        A ✅
        B ✅
        C ✅
         ↓
        Success
        ```
        
        If one rejects:
        
        ```
        A ✅
        B ❌
        C ✅
         ↓
        Promise.all() rejects
        ```
        
        Useful when all results are required.
        
        ---
        
        ## **`Promise.allSettled()`**
        
        Use when:
        
        > **I want to know what happened to everything, whether it succeeded or failed.**
        > 
        
        ```jsx
        Promise.allSettled([a, b, c])
          .then(results=> {
            console.log(results);
          });
        ```
        
        You get the outcome of every Promise.
        
        ```
        A → fulfilled
        B → rejected
        C → fulfilled
        ```
        
        One failure doesn't stop the others from being reported.
        
        ---
        
        ## **`Promise.race()`**
        
        Use when:
        
        > **I care about whichever settles first.**
        > 
        
        ```jsx
        Promise.race([a, b, c])
        ```
        
        The first Promise to settle wins.
        
        Important:
        
        > **"Settle" means fulfill OR reject.**
        > 
        
        So a rejection can win the race.
        
        ---
        
        ## **`Promise.any()`**
        
        Use when:
        
        > **I need the first successful result.**
        > 
        
        ```jsx
        Promise.any([a, b, c])
        ```
        
        Example:
        
        ```
        A ❌
        B ❌
        C ✅
         ↓
        C wins
        ```
        
        If every Promise rejects, **`Promise.any()`** rejects with an **`AggregateError`**.
        
        ---
        
        # **14. Promise Combinators — Quick Guide**
        
        | **Method** | **What it wants** |  |  |
        | --- | --- | --- | --- |
        | **`Promise.all()`** | Everyone succeeds |  |  |
        | **`Promise.allSettled()`** | Everyone finishes |  |  |
        | **`Promise.race()`** | First to settle |  |  |
        | **`Promise.any()`** | First to succeed |  |  |
        
        Easy memory trick:
        
        ```
        all        → ALL must succeed
        allSettled → ALL must finish
        race       → FIRST to settle
        any        → FIRST to succeed
        ```
        
    - Promise Internals
        
        Now let's look underneath the surface.
        
        When you create:
        
        ```jsx
        const promise = new Promise((resolve, reject)=> {
          // ...
        });
        ```
        
        the Promise internally tracks things such as:
        
        ```
        State:
        pending / fulfilled / rejected
        
        Result:
        the fulfillment value or rejection reason
        
        Reactions:
        callbacks waiting for the Promise to settle
        ```
        
        Conceptually:
        
        ```
        ┌─────────────────────────────┐
        │          PROMISE            │
        │                             │
        │ State: pending              │
        │ Result: undefined           │
        │                             │
        │ Reactions:                  │
        │   .then()                   │
        │   .catch()                  │
        └─────────────────────────────┘
        ```
        
        When it fulfills:
        
        ```
        ┌─────────────────────────────┐
        │          PROMISE            │
        │                             │
        │ State: fulfilled ✅         │
        │ Result: "Hello"             │
        │                             │
        │ Reactions → scheduled       │
        └─────────────────────────────┘
        ```
        
        Those reaction callbacks don't normally execute immediately.
        
        They are scheduled as **microtasks**.
        
        That's why this:
        
        ```jsx
        Promise.resolve().then(()=> {
          console.log("Hello");
        });
        ```
        
        doesn't print **`"Hello"`** until the current synchronous code has finished.
        
        ---
        
        # **16. A Promise Settles Only Once**
        
        Consider:
        
        ```jsx
        const promise = new Promise((resolve, reject)=> {
          resolve("A");
          resolve("B");
          reject("C");
        });
        ```
        
        The result is:
        
        ```
        A
        ```
        
        The first settlement wins.
        
        The later calls don't change the Promise.
        
        ```
        pending
          ↓
        resolve("A")
          ↓
        fulfilled("A")
          ↓
        resolve("B") → ignored
          ↓
        reject("C")  → ignored
        ```
        
        This is an important property of Promises.
        
        ---
        
        # **🧠 The Complete Mental Model**
        
        When you see:
        
        ```jsx
        fetch("/users")
          .then(response=> response.json())
          .then(users=> {
            console.log(users);
          })
          .catch(error=> {
            console.error(error);
          })
          .finally(()=> {
            console.log("Done");
          });
        ```
        
        Think:
        
        ```
        fetch()
           ↓
        Promise ⏳
           ↓
        network operation
           ↓
        Promise settles
           ↓
        .then() reaction → microtask
           ↓
        callback runs
           ↓
        returns another Promise
           ↓
        next .then()
           ↓
        ...
           ↓
        success → then()
        failure → catch()
           ↓
        finally()
        ```
        
    - **🔑 The things you REALLY Need to Remember**
        
        ### **Promise**
        
        > An object representing the eventual outcome of an operation.
        > 
        
        ### **States**
        
        ```
        pending
           ↓
        fulfilled
           OR
        rejected
        ```
        
        ### **`then()`**
        
        > Handle success and create another Promise.
        > 
        
        ### **`catch()`**
        
        > Handle rejection.
        > 
        
        ### **`finally()`**
        
        > Run cleanup regardless of success or failure.
        > 
        
        ### **Chaining**
        
        ```jsx
        promise
          .then(...)
          .then(...)
          .then(...)
        ```
        
        > The returned value from one step flows into the next.
        > 
        
        ### **Returning a Promise**
        
        > The next **`.then()`** waits for that returned Promise.
        > 
        
        ### **Error propagation**
        
        > An error can travel down the chain until a rejection handler handles it.
        > 
        
        ### **Resolution**
        
        > A Promise can adopt the state of another Promise or thenable.
        > 
        
        ### **Combinators**
        
        ```
        all         → all succeed
        allSettled  → all finish
        race        → first settles
        any         → first succeeds
        ```
        
        ### **Internally**
        
        ```
        Promise
          ↓
        tracks state
          ↓
        tracks result
          ↓
        stores reactions
          ↓
        settles
          ↓
        queues reactions as microtasks
        ```
        
        > **The biggest idea:** A Promise is not the asynchronous operation itself. It is an object representing the operation's eventual outcome.
        > 
- Promise Concurrency
    - Sequential Execution
        
        Look at this:
        
        ```jsx
        const a = await getA();
        const b = await getB();
        const c = await getC();
        ```
        
        This is **sequential**.
        
        ```
        A ───────→
                  B ───────→
                            C ───────→
        ```
        
        **`B`** doesn't start until **`A`** finishes.
        
        If each takes 1 second:
        
        ```
        Total ≈ 3 seconds
        ```
        
        This is useful when one operation **depends on the previous one**.
        
        ```jsx
        const user = await getUser();
        const posts = await getPosts(user.id);
        ```
        
        You can't get the posts until you know the user's ID.
        
    - Concurrency
        
        > **Concurrency = letting multiple operations be in progress at the same time.**
        > 
        
        Promises make concurrency much easier to control.
        
        Now imagine the operations don't depend on each other.
        
        ```jsx
        const a = getA();
        const b = getB();
        const c = getC();
        
        const results = await Promise.all([a, b, c]);
        ```
        
        Now they're all started without waiting for one another.
        
        ```
        A ───────────→
        B ───────→
        C ──────────→
        ```
        
        If each takes roughly 1 second:
        
        ```
        Total ≈ 1 second
        ```
        
        This is **concurrency**.
        
        > **Multiple operations are in progress during the same period of time.**
        > 
    - Parallelism
        
        Concurrency and parallelism are **not the same thing**.
        
        ### **Concurrency**
        
        Multiple tasks are being managed during overlapping periods.
        
        ```
        Task A ────────
               Task B ────────
        ```
        
        ### **Parallelism**
        
        Multiple tasks are **actually executing simultaneously**, usually using multiple CPU cores/threads.
        
        ```
        CPU 1: ███████████
        CPU 2: ███████████
        ```
        
        Promises give you a way to manage **concurrency**.
        
        They do **not automatically make JavaScript code run in parallel**.
        
        For example:
        
        ```jsx
        await Promise.all([
          taskA(),
          taskB()
        ]);
        ```
        
        means both operations can be in progress together.
        
        It does not mean both JavaScript functions are executing on the CPU at the exact same moment.
        
    - Promise.all()
        
        Use:
        
        ```jsx
        Promise.all()
        ```
        
        when:
        
        > **I need all of these operations to succeed.**
        > 
        
        Example:
        
        ```jsx
        const [user, posts, settings]= await Promise.all([
          getUser(),
          getPosts(),
          getSettings()
        ]);
        ```
        
        All three start without waiting for the others.
        
        ```
        getUser()    ──────────→ ✅
        getPosts()   ───────→    ✅
        getSettings() ─────────→ ✅
        ```
        
        If one rejects:
        
        ```
        A ✅
        B ❌
        C ✅
         ↓
        Promise.all() ❌
        ```
        
        The returned Promise rejects.
        
        ### **Important**
        
        **`Promise.all()`** doesn't magically cancel the other operations.
        
        If **`B`** rejects, **`A`** and **`C`** may still be running.
        
    - Promise.allSettled()
        
        Use:
        
        ```jsx
        Promise.allSettled()
        ```
        
        when:
        
        > **I want the result of every operation, even if some fail.**
        > 
        
        ```jsx
        const results = await Promise.allSettled([
          uploadPhoto(),
          uploadVideo(),
          uploadDocument()
        ]);
        ```
        
        You might get:
        
        ```jsx
        [
          { status: "fulfilled", value: "photo.jpg" },
          { status: "rejected", reason: Error(...) },
          { status: "fulfilled", value: "document.pdf" }
        ]
        ```
        
        Think:
        
        ```
        Promise.all()
               ↓
        "Did everything succeed?"
        
        Promise.allSettled()
               ↓
        "What happened to everything?"
        ```
        
    - Promise.race()
        
        Use:
        
        ```jsx
        Promise.race()
        ```
        
        when:
        
        > **I care about whichever Promise settles first.**
        > 
        
        Remember:
        
        **settles = fulfills OR rejects**
        
        ```jsx
        const result = await Promise.race([
          requestA(),
          requestB()
        ]);
        ```
        
        Example:
        
        ```
        A ───────────────→
        B ───────→ ❌
        
        B finishes first
               ↓
        race() rejects
        ```
        
        A common use case is a timeout:
        
        ```jsx
        const timeout = new Promise((_, reject)=> {
          setTimeout(()=> {
            reject(new Error("Timeout"));
          }, 5000);
        });
        
        await Promise.race([
          fetch("/data"),
          timeout
        ]);
        ```
        
        If the request takes longer than 5 seconds, the timeout wins.
        
        > ⚠️ The losing operation isn't automatically cancelled.
        > 
    - Promise.any()
        
        Use:
        
        ```jsx
        Promise.any()
        ```
        
        when:
        
        > **I want the first successful result.**
        > 
        
        ```jsx
        const result = await Promise.any([
          getFromServerA(),
          getFromServerB(),
          getFromServerC()
        ]);
        ```
        
        Imagine:
        
        ```
        A → ❌
        B → ❌
        C → ✅
        ```
        
        **`C`** wins.
        
        But:
        
        ```
        A → ❌
        B → ❌
        C → ❌
        ```
        
        means they all failed, so **`Promise.any()`** rejects with an **`AggregateError`**.
        
        ### **`race()` vs `any()`**
        
        ```
        race → first to settle
        any  → first to fulfill
        ```
        
    - Concurrency Limits
        
        **Def: Concurrency limits** refer to **the practice of restricting the number of asynchronous tasks (like API requests, database queries, or file reads) that run simultaneously**
        
        Because JavaScript is single-threaded and relies on an event loop, native utilities like `Promise.all()` fire all mapped asynchronous operations at the exact same time. If you attempt to process thousands of operations at once, you risk crashing your application, overloading your server, or getting blocked by external APIs. Setting a concurrency limit prevents this by ensuring only a defined number of tasks execute at any given moment.
        
        Here's a problem.
        
        Suppose you have:
        
        ```jsx
        const urls = [
          "/1",
          "/2",
          "/3",
          // ...
          "/10000"
        ];
        ```
        
        You could do:
        
        ```jsx
        await Promise.all(
          urls.map(url=> fetch(url))
        );
        ```
        
        That might start **thousands of operations at once**.
        
        That's not always a good idea.
        
        You could:
        
        - Overload a server
        - Use too many connections
        - Consume too much memory
        - Hit API rate limits
        - Make your application less responsive
        
        So sometimes you want:
        
        > **Only N operations running at once.**
        > 
        
        For example:
        
        ```
        Maximum concurrency = 3
        
        ████
        Task 1 ─────→
        Task 2 ────→
        Task 3 ───────→
        
        When one finishes:
        
        Task 4 ─────→
        ```
        
        This is a **concurrency limit**.
        
    - Promise Pools
        
        Def: A **Promise pool** is a pattern for limiting how many asynchronous operations are active at once.
        
        Suppose you have 100 jobs but allow only 3 at a time:
        
        ```
        Jobs:
        1 2 3 4 5 6 7 8 ...
        
        Running:
        1 2 3
        
        One finishes
        ↓
        4 starts
        
        Another finishes
        ↓
        5 starts
        ```
        
        Conceptually:
        
        ```jsx
        const poolSize = 3;
        ```
        
        The pool keeps feeding work into the available slots.
        
        ### **Why use a pool?**
        
        Instead of:
        
        ```
        100 tasks → 🚨 all at once
        ```
        
        you get:
        
        ```
        3 tasks
           ↓
        3 tasks
           ↓
        3 tasks
           ↓
        ...
        ```
        
        This gives you control over resource usage.
        
    - Backpressure
        
        **Backpressure** in JavaScript asynchronous programming is a data flow phenomenon that occurs when a data **producer generates data faster than a data consumer can process it**. Since JavaScript handles tasks asynchronously without blocking the main execution thread, it hides natural bottlenecks. Instead of stopping, the system accumulates the unhandled data in memory (RAM), which eventually leads to massive latency spikes, performance degradation, or application crashes.
        
        Backpressure is what happens when:
        
        > **Work is arriving faster than you can process it.**
        > 
        
        Imagine a factory:
        
        ```
        Incoming work
        ↓↓↓↓↓↓↓↓↓↓↓↓
        ┌─────────────┐
        │  PROCESSOR  │
        └─────────────┘
              ↓
           Output
        ```
        
        If 1,000 jobs arrive every second but you can only process 100:
        
        ```
        Incoming: 1000/sec
        Processing: 100/sec
        ```
        
        The queue keeps growing.
        
        That's backpressure.
        
        In JavaScript applications, this can happen with:
        
        - File processing
        - Message queues
        - Streams
        - API requests
        - User-generated jobs
        - Large batches of asynchronous work
        
        Concurrency limits help:
        
        ```
        Too much incoming work
                ↓
        Limit active work
                ↓
        Queue remaining work
                ↓
        Process at manageable speed
        ```
        
        ---
        
        # **🧠 The Big Picture**
        
        There are three very different situations.
        
        ### **Sequential**
        
        ```
        A ─────→
                B ─────→
                        C ─────→
        ```
        
        Use when operations depend on each other.
        
        ---
        
        ### **Concurrent**
        
        ```
        A ──────────→
        B ───────→
        C ───────────→
        ```
        
        Use when operations are independent.
        
        ---
        
        ### **Limited concurrency**
        
        ```
        A ─────→
        B ───────→
        C ────────→
        
        D waits...
        
        A finishes
        ↓
        D starts
        ```
        
        Use when you have lots of independent work but don't want everything running at once.
        
        ---
        
    - **🔑 Quick Reference**
        
        
        | **Tool** | **Meaning** |
        | --- | --- |
        | **`await A; await B`** | Sequential |
        | **`Promise.all()`** | All must fulfill |
        | **`Promise.allSettled()`** | Wait for everything |
        | **`Promise.race()`** | First to settle |
        | **`Promise.any()`** | First to fulfill |
        | Concurrency limit | Cap active operations |
        | Promise pool | Manage work within that limit |
        | Backpressure | Slow incoming work to match processing capacity |
        
        ### **The golden rule**
        
        > **Don't automatically use `Promise.all()` just because you can.**
        > 
        
        Ask:
        
        **"How many things should I allow to be in progress at once?"**
        
        For 3 independent API requests:
        
        ```jsx
        await Promise.all([a(), b(), c()]);
        ```
        
        Perfect.
        
        For 50,000 requests:
        
        ```jsx
        await Promise.all(hugeArray.map(doSomething));
        ```
        
        🚨 Maybe not.
        
        That's when **concurrency limits, pools, and backpressure** become important.
        
- async & await
    - async Functions
        
        Put **`async`** before a function:
        
        ```jsx
        async function getUser() {
          return "Alice";
        }
        ```
        
        An **`async`** function **always returns a Promise**.
        
        So:
        
        ```jsx
        const result = getUser();
        ```
        
        doesn't give you:
        
        ```
        "Alice"
        ```
        
        It gives you:
        
        ```
        Promise → "Alice"
        ```
        
        Conceptually:
        
        ```jsx
        async function getUser() {
          return "Alice";
        }
        ```
        
        is similar to:
        
        ```jsx
        function getUser() {
          return Promise.resolve("Alice");
        }
        ```
        
        **Async functions** are JavaScript functions that can **pause while waiting for something to finish without blocking the rest of the program**.
        
    - await
        
        **`await`** lets you wait for a Promise's result **inside an async function**.
        
        ```jsx
        async function main() {
          const user = await getUser();
        
          console.log(user);
        }
        ```
        
        Read it as:
        
        > "Wait for this Promise's outcome, then give me its value."
        > 
        
        If:
        
        ```jsx
        getUser()
        ```
        
        fulfills with:
        
        ```
        Alice
        ```
        
        then:
        
        ```jsx
        const user = await getUser();
        ```
        
        makes **`user`** equal:
        
        ```
        Alice
        ```
        
        ---
        
        ## **⚠️ `await` does NOT block the whole JavaScript thread**
        
        This is extremely important.
        
        When JavaScript reaches:
        
        ```jsx
        const user = await getUser();
        ```
        
        the **async function pauses its own continuation**.
        
        JavaScript can continue doing other work.
        
        Think:
        
        ```
        async function
             ↓
           await
             ↓
        "Continue me later."
             ↓
        Other JavaScript can run
             ↓
        Promise settles
             ↓
        async function continues
        ```
        
        So **`await`** is not the same as:
        
        ```
        "Freeze JavaScript until this finishes."
        ```
        
    - Error Handling
        
        If the Promise rejects:
        
        ```jsx
        async function main() {
          const user = await getUser();
        }
        ```
        
        the **`await`** expression throws the rejection reason.
        
        So we can use normal **`try/catch`**:
        
        ```jsx
        async function main() {
          try {
            const user = await getUser();
            console.log(user);
          }catch (error) {
            console.log("Something went wrong:", error);
          }
        }
        ```
        
        This is one of the biggest reasons people like **`async/await`**.
        
        Compare:
        
        ```jsx
        getUser()
          .then(user=> {
            console.log(user);
          })
          .catch(error=> {
            console.log(error);
          });
        ```
        
        with:
        
        ```jsx
        try {
          const user = await getUser();
          console.log(user);
        }catch (error) {
          console.log(error);
        }
        ```
        
        Same Promise world.
        
        Different syntax.
        
    - Sequential await
        
        Be careful with this:
        
        ```jsx
        const a = await getA();
        const b = await getB();
        const c = await getC();
        ```
        
        This is sequential.
        
        ```
        A ───────→
                 B ───────→
                          C ───────→
        ```
        
        If each takes about 1 second:
        
        ```
        Total ≈ 3 seconds
        ```
        
        This is correct when the operations depend on each other.
        
        Example:
        
        ```jsx
        const user = await getUser();
        
        const posts = await getPosts(user.id);
        ```
        
        You need the user ID before you can request the posts.
        
    - Concurrent await
        
        But what if the operations are independent?
        
        Don't do:
        
        ```jsx
        const users = await getUsers();
        const posts = await getPosts();
        const settings = await getSettings();
        ```
        
        if they don't depend on each other.
        
        Instead:
        
        ```jsx
        const [users, posts, settings]= await Promise.all([
          getUsers(),
          getPosts(),
          getSettings()
        ]);
        ```
        
        Now they can be in progress together.
        
        ```
        Users    ─────────→
        Posts    ───────→
        Settings ──────────→
        ```
        
        Total time is approximately the time of the slowest operation rather than the sum of all three.
        
        ### **Simple rule**
        
        > **Dependent? Sequential.**
        > 
        
        ```jsx
        const user = await getUser();
        const posts = await getPosts(user.id);
        ```
        
        > **Independent? Concurrent.**
        > 
        
        ```jsx
        const [users, posts]= await Promise.all([
          getUsers(),
          getPosts()
        ]);
        ```
        
    - Top-level await
        
        Normally, **`await`** is used inside an **`async`** function:
        
        ```jsx
        async function main() {
          const data = await getData();
        }
        ```
        
        But modern JavaScript modules can use **`await`** at the top level:
        
        ```jsx
        const data = await getData();
        
        console.log(data);
        ```
        
        This is called **top-level `await`**.
        
        It is available in JavaScript modules.
        
        Example:
        
        ```jsx
        // config.js
        
        const config = await loadConfig();
        
        export default config;
        ```
        
        Another module can then import it.
        
        Top-level **`await`** can be useful, but don't use it casually.
        
        A module that depends on a slow top-level operation may delay its dependents from finishing module evaluation.
        
    - async / await Internals
        
        > **`async`/`await` is a cleaner way to work with Promises.**
        > 
        
        It doesn't replace Promises.
        
        It is built **on top of Promises**.
        
        Here's the important part:
        
        > **`async`/`await` does not create a new asynchronous system. It uses Promises.**
        > 
        
        Consider:
        
        ```jsx
        async function getData() {
          const response = await fetch("/data");
        
          return response.json();
        }
        ```
        
        Conceptually:
        
        ```
        async function
              ↓
        returns Promise
              ↓
        await Promise
              ↓
        pause function's continuation
              ↓
        Promise settles
              ↓
        continue function
              ↓
        return value
              ↓
        outer Promise settles
        ```
        
        ---
        
        ## **What happens at `await`?**
        
        Suppose:
        
        ```jsx
        async function main() {
          console.log("A");
        
          const value = await Promise.resolve("B");
        
          console.log(value);
        }
        ```
        
        The important idea is:
        
        ```
        "A"
         ↓
        await
         ↓
        pause continuation
         ↓
        Promise reaction is scheduled
         ↓
        current synchronous work finishes
         ↓
        microtask runs
         ↓
        continue function
         ↓
        "B"
        ```
        
        That's why:
        
        ```jsx
        async function main() {
          console.log("A");
        
          await Promise.resolve();
        
          console.log("B");
        }
        
        console.log("C");
        
        main();
        
        console.log("D");
        ```
        
        produces:
        
        ```
        A
        C
        D
        B
        ```
        
        The **`async`** function starts running synchronously until it reaches the **`await`**.
        
        Then its continuation happens later.
        
    - **What Does an `async` Function Return?**
        
        Consider:
        
        ```jsx
        async function add() {
          return 10;
        }
        ```
        
        Calling:
        
        ```jsx
        const result = add();
        ```
        
        gives you a Promise.
        
        ```jsx
        result.then(value=> {
          console.log(value);
        });
        ```
        
        prints:
        
        ```
        10
        ```
        
        So:
        
        ```jsx
        async function add() {
          return 10;
        }
        ```
        
        is conceptually similar to:
        
        ```jsx
        function add() {
          return Promise.resolve(10);
        }
        ```
        
    - **What Happens When `async` Throws?**
        
        Consider:
        
        ```jsx
        async function test() {
          throw new Error("Oops");
        }
        ```
        
        Calling:
        
        ```jsx
        test();
        ```
        
        doesn't synchronously throw the error to the caller in the normal way.
        
        Instead, the returned Promise becomes rejected.
        
        Conceptually:
        
        ```jsx
        function test() {
          return Promise.reject(new Error("Oops"));
        }
        ```
        
        So:
        
        ```jsx
        test().catch(error=> {
          console.log(error.message);
        });
        ```
        
        prints:
        
        ```
        Oops
        ```
        
    - **The Mental Model**
        
        Don't think:
        
        ```
        async/await = completely different from Promises
        ```
        
        Think:
        
        ```
                     PROMISES
                        ↑
                        │
                  async / await
                        │
                nicer syntax for
               working with them
        ```
        
        Example:
        
        ### **Promise style**
        
        ```jsx
        getUser()
          .then(user=> getPosts(user.id))
          .then(posts=> {
            console.log(posts);
          })
          .catch(error=> {
            console.log(error);
          });
        ```
        
        ### **`async/await` style**
        
        ```jsx
        try {
          const user = await getUser();
          const posts = await getPosts(user.id);
        
          console.log(posts);
        }catch (error) {
          console.log(error);
        }
        ```
        
        Underneath, you're still dealing with Promises.
        
        > **`async` = this function can work with asynchronous operations.**
        > 
        > 
        > **`await` = pause this function until the Promise finishes, but don't freeze JavaScript.**
        > 
    - **🔑 Remember**
        
        ### **`async`**
        
        > Makes a function return a Promise.
        > 
        
        ### **`await`**
        
        > Waits for a Promise's outcome inside an async function/module and pauses that function's continuation.
        > 
        
        ### **Rejection**
        
        > **`await`** turns a rejected Promise into a thrown error.
        > 
        
        ### **`try/catch`**
        
        > Handles errors from **`await`**.
        > 
        
        ### **Sequential**
        
        ```jsx
        await A();
        await B();
        ```
        
        > B starts after A finishes.
        > 
        
        ### **Concurrent**
        
        ```jsx
        await Promise.all([
          A(),
          B()
        ]);
        ```
        
        > A and B can be in progress together.
        > 
        
        ### **Top-level `await`**
        
        > Allows **`await`** directly in JavaScript modules.
        > 
        
        ### **The most important idea**
        
        > **`async/await` is Promise syntax, not a replacement for Promises.**
        > 
        
        Once you understand that, **`async/await`** stops feeling like magic.
        
- Async Web APIs
    - Web APIs
        
        > **Web APIs let JavaScript communicate with the outside world — servers, browsers, users, and more.**
        > 
        
        The most important ones here are **Fetch**, **HTTP**, **JSON**, and **AbortController**.
        
    - XMLHttpRequest(XHR)
        
        Before **`fetch()`**, browsers commonly used:
        
        ```jsx
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", "/users");
        
        xhr.onload = ()=> {
          console.log(xhr.responseText);
        };
        
        xhr.send();
        ```
        
        The basic flow:
        
        ```
        Create request
             ↓
        Configure request
             ↓
        Send request
             ↓
        ⏳ Wait
             ↓
        Server responds
             ↓
        Callback runs
        ```
        
        **`XMLHttpRequest`** is asynchronous when used with its default asynchronous mode.
        
        ### **Why don't we use it much anymore?**
        
        Because its API is older and more complicated.
        
        Today, **`fetch()`** is generally easier:
        
        ```jsx
        const response = await fetch("/users");
        ```
        
    - Fetch
        
        **`fetch()`** is the modern browser API for making HTTP requests.
        
        ```jsx
        const response = await fetch("/users");
        ```
        
        **`fetch()`** returns a **Promise**.
        
        So:
        
        ```
        fetch()
           ↓
        Promise
           ↓
        ⏳ Request
           ↓
        Response arrives
           ↓
        Promise fulfills
        ```
        
        Example:
        
        ```jsx
        async function getUsers() {
          const response = await fetch("/users");
        
          console.log(response);
        }
        ```
        
        ---
        
        ## **Sending different requests**
        
        ### **GET**
        
        Get data:
        
        ```jsx
        fetch("/users");
        ```
        
        ### **POST**
        
        Send data:
        
        ```jsx
        fetch("/users", {
          method: "POST",
          body: JSON.stringify({
            name: "Alice"
          })
        });
        ```
        
        ### **PUT**
        
        Replace/update data:
        
        ```jsx
        fetch("/users/1", {
          method: "PUT",
          body: JSON.stringify({
            name: "Bob"
          })
        });
        ```
        
        ### **DELETE**
        
        Delete data:
        
        ```jsx
        fetch("/users/1", {
          method: "DELETE"
        });
        ```
        
    - HTTP Requests
        
        When your JavaScript communicates with a server, it usually uses **HTTP**.
        
        Think of HTTP as a conversation:
        
        ```
        Browser
           │
           │  Request
           ↓
        Server
           │
           │  Response
           ↓
        Browser
        ```
        
        A request contains things such as:
        
        ```
        Method
        URL
        Headers
        Body
        ```
        
        Example:
        
        ```
        POST /users
        Content-Type: application/json
        
        {"name":"Alice"}
        ```
        
        The server processes it and sends back a response.
        
        ---
        
        ## **HTTP Methods**
        
        Common methods:
        
        | **Method** | **Typical purpose** |
        | --- | --- |
        | **`GET`** | Get data |
        | **`POST`** | Create/send data |
        | **`PUT`** | Replace data |
        | **`PATCH`** | Partially update data |
        | **`DELETE`** | Delete data |
        
        Don't think of these as strict rules, but this is the common usage.
        
    - Response Objects
        
        This is an important detail with **`fetch()`**.
        
        When you do:
        
        ```jsx
        const response = await fetch("/users");
        ```
        
        **`response`** is **not the actual JSON data**.
        
        It's a **Response object**.
        
        It contains information about the HTTP response.
        
        For example:
        
        ```jsx
        console.log(response.status);
        console.log(response.ok);
        console.log(response.headers);
        ```
        
        You can think:
        
        ```
        Response
        ├── status
        ├── headers
        ├── ok
        └── body
        ```
        
        Example:
        
        ```jsx
        const response = await fetch("/users");
        
        console.log(response.status);
        ```
        
        You might get:
        
        ```
        200
        ```
        
        ---
        
        ## **`response.ok`**
        
        ```jsx
        if (response.ok) {
          // successful HTTP response
        }
        ```
        
        **`ok`** is **`true`** for a successful HTTP status in the 200–299 range.
        
        ---
        
        ## **⚠️ Important: `fetch()` and HTTP errors**
        
        This surprises many beginners.
        
        A **`404`** or **`500`** response does **not normally cause `fetch()` itself to reject**.
        
        For example:
        
        ```jsx
        const response = await fetch("/does-not-exist");
        ```
        
        The Promise can still fulfill.
        
        You need to check:
        
        ```jsx
        if (!response.ok) {
          throw new Error(`HTTP error:${response.status}`);
        }
        ```
        
        So:
        
        ```
        Network failure
            ↓
        fetch() rejects ❌
        
        HTTP 404
            ↓
        fetch() fulfills ✅
            ↓
        response.ok === false
        ```
        
        That's a very important distinction.
        
    - JSON
        
        JSON stands for:
        
        > **JavaScript Object Notation**
        > 
        
        It's a text format commonly used to exchange data between servers and applications.
        
        Example JSON:
        
        ```json
        {
          "name": "Alice",
          "age": 25
        }
        ```
        
        It looks a lot like a JavaScript object, but JSON is **text**, not a JavaScript object.
        
        ---
        
        ## **Reading JSON from a response**
        
        Suppose the server sends:
        
        ```json
        {
          "name": "Alice"
        }
        ```
        
        You can do:
        
        ```jsx
        const response = await fetch("/user");
        
        const user = await response.json();
        
        console.log(user.name);
        ```
        
        Notice:
        
        ```jsx
        response.json()
        ```
        
        returns a **Promise**.
        
        So you need:
        
        ```jsx
        await response.json();
        ```
        
        The flow is:
        
        ```
        fetch()
           ↓
        Response object
           ↓
        response.json()
           ↓
        Promise
           ↓
        JSON parsed
           ↓
        JavaScript value
        ```
        
        ---
        
        ## **Sending JSON**
        
        When sending JSON:
        
        ```jsx
        const user = {
          name: "Alice"
        };
        
        fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        });
        ```
        
        Two important functions:
        
        ### **JavaScript → JSON text**
        
        ```jsx
        JSON.stringify()
        ```
        
        ### **JSON text → JavaScript value**
        
        ```jsx
        JSON.parse()
        ```
        
        Easy memory trick:
        
        ```
        stringify → turn into string
        parse     → turn string into value
        ```
        
    - AbortController
        
        Sometimes you start an asynchronous operation and then decide:
        
        > **"I don't need this anymore."**
        > 
        
        For example:
        
        ```
        User searches:
        "javascript"
        
        Request starts...
        
        User immediately searches:
        "javascript promises"
        
        The first request is now unnecessary.
        ```
        
        You can use **`AbortController`**.
        
        ```jsx
        const controller = new AbortController();
        
        fetch("/users", {
          signal: controller.signal
        });
        
        controller.abort();
        ```
        
        The signal tells **`fetch()`**:
        
        > "Abort this request."
        > 
        
        ---
        
        ## **Example**
        
        ```jsx
        const controller = new AbortController();
        
        try {
          const response = await fetch("/users", {
            signal: controller.signal
          });
        
          const users = await response.json();
        
          console.log(users);
        }catch (error) {
          if (error.name=== "AbortError") {
            console.log("Request was cancelled");
          }
        }
        ```
        
        The important pieces are:
        
        ```
        AbortController
              ↓
        controller.signal
              ↓
        fetch()
              ↓
        controller.abort()
              ↓
        request aborted
        ```
        
        ### **Why is this useful?**
        
        - Cancel old searches
        - Cancel unnecessary requests
        - Stop work when a component disappears
        - Implement timeouts
        - Give users a cancel button
    - WebSocket & Events
        
        **`fetch()`** is generally:
        
        ```
        Request
           ↓
        Response
        ```
        
        You ask the server for something.
        
        But sometimes you want an **ongoing connection**.
        
        That's where WebSockets come in.
        
        ```
        HTTP:
        
        Client ──→ Request
        Client ←── Response
        
        WebSocket:
        
        Client ←──────────────→ Server
               persistent connection
        ```
        
        A WebSocket allows both sides to send messages over an ongoing connection.
        
        ---
        
        ## **Creating a WebSocket**
        
        ```jsx
        const socket = new WebSocket("wss://example.com");
        ```
        
        Then listen for events:
        
        ```jsx
        socket.addEventListener("open", ()=> {
          console.log("Connected!");
        });
        ```
        
        When a message arrives:
        
        ```jsx
        socket.addEventListener("message", event=> {
          console.log(event.data);
        });
        ```
        
        When the connection closes:
        
        ```jsx
        socket.addEventListener("close", ()=> {
          console.log("Disconnected");
        });
        ```
        
        And errors:
        
        ```jsx
        socket.addEventListener("error", error=> {
          console.log("Something went wrong");
        });
        ```
        
        You can also send data:
        
        ```jsx
        socket.send("Hello server!");
        ```
        
        ---
        
        # **🧠 WebSocket Mental Model**
        
        Think of it like a phone call 📞.
        
        ### **HTTP**
        
        ```
        "Hey server, give me the data."
        
                ↓
        
        "Here it is."
        
                ↓
        
        Done.
        ```
        
        ### **WebSocket**
        
        ```
        "Let's keep a connection open."
        
        Client ←────────→ Server
        
        Client → message
        Server → message
        Server → message
        Client → message
        ...
        ```
        
        This is useful for things like:
        
        - Chat applications
        - Live notifications
        - Multiplayer games
        - Real-time dashboards
        - Live collaboration
        
        ---
        
        # **🔑 The Big Picture**
        
        You should now be able to see how these APIs fit together:
        
        ```
                          JavaScript
                              │
                  ┌───────────┴───────────┐
                  ↓                       ↓
               fetch()              WebSocket
                  │                       │
                  ↓                       ↓
             HTTP Request          Persistent connection
                  │                       │
                  ↓                       ↓
               Response               Events
                  │
                  ↓
             response.json()
                  │
                  ↓
             JavaScript data
        ```
        
        And underneath:
        
        ```
        Async Web API
             ↓
        Promise / Event
             ↓
        Event Loop
             ↓
        JavaScript callback / continuation
        ```
        
    - **🔑 Remember**
        
        ### **`XMLHttpRequest`**
        
        > Older browser API for HTTP requests.
        > 
        
        ### **`fetch()`**
        
        > Modern Promise-based API for HTTP requests.
        > 
        
        ### **HTTP**
        
        > The communication protocol commonly used between clients and servers.
        > 
        
        ### **Response**
        
        > **`fetch()`** gives you a Response object first, not automatically the parsed data.
        > 
        
        ### **JSON**
        
        ```jsx
        JSON.stringify()// JS → JSON text
        JSON.parse()// JSON text → JS
        response.json()// Response body → Promise of parsed data
        ```
        
        ### **`AbortController`**
        
        > Allows aborting operations that support an **`AbortSignal`**.
        > 
        
        ### **WebSocket**
        
        > Keeps a connection open so the client and server can communicate through events.
        > 
        
        > **The key idea:** Web APIs are the bridge between your JavaScript program and the outside world. Promises and the event loop are what let JavaScript deal with the results without blocking everything else.
        > 
- Async Iteration
    - Async Iteration
        
        > **Async iteration lets you process values that arrive over time, one by one.**
        > 
        
        Normal iteration is:
        
        ```
        "I already have all the values."
                ↓
        process them one by one
        ```
        
        Async iteration is:
        
        ```
        "I don't have all the values yet."
                ↓
        wait for the next value
                ↓
        process it
                ↓
        wait for the next one
                ↓
        ...
        ```
        
    - Iterators
        
        An **iterator** is an object that gives you values one at a time.
        
        For example:
        
        ```jsx
        const numbers = [10, 20, 30];
        
        const iterator = numbersSymbol.iterator;
        
        console.log(iterator.next());
        console.log(iterator.next());
        console.log(iterator.next());
        ```
        
        You get:
        
        ```jsx
        { value: 10, done: false }
        { value: 20, done: false }
        { value: 30, done: false }
        ```
        
        Then:
        
        ```jsx
        iterator.next();
        ```
        
        gives:
        
        ```jsx
        { value: undefined, done: true }
        ```
        
        Think of an iterator as:
        
        ```
        Iterator
           ↓
        next() → 10
        next() → 20
        next() → 30
        next() → done
        ```
        
        ---
        
        ## **`for...of`**
        
        You normally don't call **`.next()`** yourself.
        
        JavaScript does it for you:
        
        ```jsx
        for (const number of numbers) {
          console.log(number);
        }
        ```
        
        Conceptually:
        
        ```
        next() → 10
        next() → 20
        next() → 30
        next() → done
        ```
        
    - Generators
        
        A **generator** is a special function that can pause and continue later.
        
        You create one with:
        
        ```jsx
        function* numbers() {
          yield 10;
          yield 20;
          yield 30;
        }
        ```
        
        Notice:
        
        ```jsx
        *
        ```
        
        and:
        
        ```jsx
        yield
        ```
        
        ---
        
        ## **Using a generator**
        
        ```jsx
        const generator = numbers();
        
        console.log(generator.next());
        console.log(generator.next());
        console.log(generator.next());
        ```
        
        Result:
        
        ```jsx
        { value: 10, done: false }
        { value: 20, done: false }
        { value: 30, done: false }
        ```
        
        The generator pauses at each **`yield`**.
        
        ```
        function starts
             ↓
        yield 10
             ↓
        ⏸️ pause
             ↓
        next()
             ↓
        yield 20
             ↓
        ⏸️ pause
             ↓
        next()
             ↓
        yield 30
        ```
        
        ---
        
        ## **Generators work with `for...of`**
        
        ```jsx
        function* numbers() {
          yield 10;
          yield 20;
          yield 30;
        }
        
        for (const number of numbers()) {
          console.log(number);
        }
        ```
        
        Output:
        
        ```
        10
        20
        30
        ```
        
    - Async Iterators
        
        Now we add **asynchronous behavior**.
        
        A normal iterator gives:
        
        ```
        value
        ```
        
        An async iterator gives:
        
        ```
        Promise → value
        ```
        
        Instead of:
        
        ```jsx
        iterator.next()
        ```
        
        giving:
        
        ```jsx
        { value: 10, done: false }
        ```
        
        an async iterator's **`.next()`** returns a Promise that eventually gives:
        
        ```jsx
        { value: 10, done: false }
        ```
        
        Conceptually:
        
        ```
        next()
          ↓
        Promise
          ↓
        ⏳
          ↓
        { value, done }
        ```
        
        This is useful when the next value isn't immediately available.
        
        For example:
        
        ```
        Get message 1
              ↓
        wait
              ↓
        message 1 arrives
        
        Get message 2
              ↓
        wait
              ↓
        message 2 arrives
        ```
        
    - Async Generators
        
        An **async generator** combines:
        
        - Generators
        - Promises
        - Async iteration
        
        Syntax:
        
        ```jsx
        async function* messages() {
          yield "Hello";
          yield "World";
        }
        ```
        
        Notice:
        
        ```jsx
        async function*
        ```
        
        You can use **`await`** inside:
        
        ```jsx
        async function* getData() {
          const first = await getFirst();
          yield first;
        
          const second = await getSecond();
          yield second;
        }
        ```
        
        The generator can now produce values asynchronously.
        
        - **`async/await`** → **"Wait for this asynchronous operation."**
        - **`function* / yield`** → **"Pause here; I'll tell you when to continue."**
        
        **Async generators** combine both ideas: they let a function **pause/resume with `yield`** while also **waiting for asynchronous operations with `await`**.
        
        > **Async generator = "Give me values one at a time, and I may need to wait asynchronously between values."**
        > 
        - **`async`** → can use **`await`**
        - **`await`** → waits for a Promise
        - **`*`** → makes it a generator
        - **`yield`** → produces a value and pauses
        - **`for await...of`** → consumes the values asynchronously
    - for await…of
        
        This is the easiest way to consume an async iterable.
        
        ```jsx
        async function* numbers() {
          yield 10;
          yield 20;
          yield 30;
        }
        
        for await (const number of numbers()) {
          console.log(number);
        }
        ```
        
        Output:
        
        ```
        10
        20
        30
        ```
        
        The important difference:
        
        ```jsx
        for (const value of iterable)
        ```
        
        vs.
        
        ```jsx
        for await (const value of asyncIterable)
        ```
        
        ### **`for...of`**
        
        ```
        Give me the next value.
        ↓
        Here it is.
        ↓
        Next.
        ```
        
        ### **`for await...of`**
        
        ```
        Give me the next value.
        ↓
        ⏳ Wait for it.
        ↓
        Here it is.
        ↓
        Give me the next one.
        ↓
        ⏳ Wait...
        ```
        
        ---
        
        # **🧠 A Real Example**
        
        Imagine a server sending pieces of data over time.
        
        ```
        Server
          ↓
        "Hello"
          ↓
        "How"
          ↓
        "are"
          ↓
        "you?"
        ```
        
        An async generator could expose those pieces one at a time:
        
        ```jsx
        async function* getMessages() {
          yield await getMessage1();
          yield await getMessage2();
          yield await getMessage3();
        }
        ```
        
        Then:
        
        ```jsx
        for await (const message of getMessages()) {
          console.log(message);
        }
        ```
        
        You process each value as it becomes available.
        
        You don't need to wait for everything first.
        
    - **Async Iteration vs `Promise.all()`**
        
        This distinction is important.
        
        Suppose you have:
        
        ```
        A
        B
        C
        D
        ```
        
        ### **`Promise.all()`**
        
        You generally start everything together:
        
        ```jsx
        const results = await Promise.all([
          getA(),
          getB(),
          getC(),
          getD()
        ]);
        ```
        
        Think:
        
        ```
        A ───────→
        B ───→
        C ─────────→
        D ─────→
        
        Wait for all
               ↓
        Results
        ```
        
        ---
        
        ### **Async iteration**
        
        You can process values as a sequence:
        
        ```jsx
        for await (const value of getValues()) {
          process(value);
        }
        ```
        
        Think:
        
        ```
        Get A
         ↓
        process A
        
        Get B
         ↓
        process B
        
        Get C
         ↓
        process C
        ```
        
        This is especially useful for **streams of data**.
        
        ---
        
        # **🧠 The Full Picture**
        
        ```
        Iterator
           ↓
        next()
           ↓
        { value, done }
        ```
        
        Generator:
        
        ```
        function*
           ↓
        yield
           ↓
        pause
           ↓
        next()
           ↓
        continue
        ```
        
        Async Iterator:
        
        ```
        next()
           ↓
        Promise
           ↓
        { value, done }
        ```
        
        Async Generator:
        
        ```
        async function*
               ↓
             yield
               ↓
           Promise + value
        ```
        
        **`for await...of`**:
        
        ```
        async iterable
              ↓
        for await
              ↓
        next()
              ↓
        await result
              ↓
        process value
              ↓
        next()
              ↓
        ...
        ```
        
    - **🔑 Remember**
        
        ### **Iterator**
        
        > Gives values one at a time through **`.next()`**.
        > 
        
        ### **Generator**
        
        > A function that can pause at **`yield`** and continue later.
        > 
        
        ### **Async Iterator**
        
        > An iterator whose **`.next()`** result is asynchronous.
        > 
        
        ### **Async Generator**
        
        > A generator that can **`await`** and produce values asynchronously.
        > 
        
        ### **`for await...of`**
        
        > Loops through an async iterable, waiting for each value.
        > 
        
        The simplest way to remember the whole topic:
        
        ```
        Iterator
        → next() gives value
        
        Generator
        → yield gives value
        
        Async Iterator
        → next() eventually gives value
        
        Async Generator
        → yield eventually gives value
        
        for await...of
        → "Give me each value whenever it's ready."
        ```
        
        > **Async iteration is especially powerful when data doesn't arrive all at once — such as streams, paginated data, events, or chunks of a large response.**
        > 
- Cancellation & Timeouts
    - **Cancellation & Timeouts**
        
        > **A Promise represents a result. It does not provide a built-in way to cancel the work producing that result.**
        > 
        
        This distinction is extremely important.
        
    - Why Promises Don’t Cancel
        
        Suppose:
        
        ```jsx
        const promise = fetch("/users");
        ```
        
        You have a Promise.
        
        You might think:
        
        ```jsx
        promise.cancel();
        ```
        
        But there is no standard:
        
        ```jsx
        promise.cancel();
        ```
        
        Why?
        
        Because a Promise represents the **eventual result**:
        
        ```
        Promise
          ↓
        pending
          ↓
        fulfilled OR rejected
        ```
        
        It doesn't own the operation that produces that result.
        
        Think:
        
        ```
        Promise = "What will the result eventually be?"
        
        Cancellation = "Stop doing the work."
        ```
        
        These are different things.
        
        ---
        
        ## **Example**
        
        ```jsx
        const promise = fetch("/large-file");
        ```
        
        The Promise represents the result of the request.
        
        To cancel the actual request, you need something that the API understands as a cancellation signal.
        
        That's where:
        
        ```jsx
        AbortController
        ```
        
        comes in.
        
        Conclusion: Promises don't cancel because a **Promise is a representation of a result, not the operation producing that result**.
        
    - AbortController
        
        **Def:** **AbortController is a mechanism for requesting cancellation of an ongoing asynchronous operation.**
        
        **`AbortController`** is an object you can use to request cancellation.
        
        ```jsx
        const controller = new AbortController();
        ```
        
        It gives you a signal:
        
        ```jsx
        controller.signal
        ```
        
        You pass that signal to an API that supports it:
        
        ```jsx
        fetch("/users", {
          signal: controller.signal
        });
        ```
        
        Then:
        
        ```jsx
        controller.abort();
        ```
        
        requests that operation to stop.
        
        The flow:
        
        ```
        AbortController
               │
               ↓
           AbortSignal
               │
               ↓
             fetch()
               │
               │
        controller.abort()
               ↓
          Abort requested
               ↓
        fetch rejects
        ```
        
    - AbortSignal
        
        **Def:** An **`AbortSignal`** is an object that represents a **cancellation signal** sent from an **`AbortController`** to an asynchronous operation.
        
        The **AbortSignal** is what the operation listens to.
        
        ```jsx
        const controller = new AbortController();
        
        const signal = controller.signal;
        ```
        
        You give the signal to the operation:
        
        ```jsx
        fetch("/users", {
          signal
        });
        ```
        
        The signal starts as:
        
        ```jsx
        signal.aborted
        ```
        
        which is:
        
        ```
        false
        ```
        
        After:
        
        ```jsx
        controller.abort();
        ```
        
        it becomes:
        
        ```
        true
        ```
        
        You can check it:
        
        ```jsx
        if (signal.aborted) {
          console.log("Already cancelled");
        }
        ```
        
        ---
        
        ## **Listening for cancellation**
        
        A signal also emits an **`abort`** event:
        
        ```jsx
        signal.addEventListener("abort", ()=> {
          console.log("Cancelled!");
        });
        ```
        
        So:
        
        ```
        controller
            │
            │ abort()
            ↓
         signal
            │
            ├── aborted = true
            │
            └── "abort" event
        ```
        
    - Cancelling a Fetch
        
        A complete example:
        
        ```jsx
        const controller = new AbortController();
        
        async function getUsers() {
          try {
            const response = await fetch("/users", {
              signal: controller.signal
            });
        
            const users = await response.json();
        
            console.log(users);
          }catch (error) {
            if (error.name=== "AbortError") {
              console.log("Request cancelled");
              return;
            }
        
            console.error("Request failed:", error);
          }
        }
        
        getUsers();
        ```
        
        Later:
        
        ```jsx
        controller.abort();
        ```
        
        The fetch is aborted.
        
    - Timeouts
        
        Sometimes you don't want to wait forever.
        
        For example:
        
        ```
        Request starts
             ↓
        ⏳
             ↓
        5 seconds
             ↓
        Still nothing?
             ↓
        Cancel request
        ```
        
        That's a **timeout**.
        
        Modern JavaScript environments provide a convenient way to create a timeout signal:
        
        ```jsx
        const signal = AbortSignal.timeout(5000);
        
        fetch("/users", {
          signal
        });
        ```
        
        This means roughly:
        
        > "Abort this operation after 5 seconds."
        > 
        
        ---
        
        ## **Handling the timeout**
        
        ```jsx
        try {
          const response = await fetch("/users", {
            signal: AbortSignal.timeout(5000)
          });
        
          console.log(await response.json());
        }catch (error) {
          console.log(error);
        }
        ```
        
        A timeout causes the operation to abort.
        
        You can distinguish the timeout from other errors where the environment/API exposes an appropriate error name or reason.
        
    - **Combining Cancellation + Timeout**
        
        Sometimes you want **both**:
        
        ```
        User can cancel
                +
        Automatic timeout
        ```
        
        Modern environments support combining abort signals with:
        
        ```jsx
        AbortSignal.any()
        ```
        
        Example:
        
        ```jsx
        const controller = new AbortController();
        
        const signal = AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(5000)
        ]);
        
        fetch("/users", { signal });
        ```
        
        Now there are two ways to stop the request:
        
        ```
        User calls:
        controller.abort()
                ↓
              STOP
        
        OR
        
        5 seconds pass
                ↓
              STOP
        ```
        
    - Cancellation Patterns
        
        ## **Pattern 1 — Cancel the previous request**
        
        This is extremely useful for search boxes.
        
        Imagine:
        
        ```
        User types:
        
        j
        ja
        jav
        java
        ```
        
        You don't want old searches returning after newer ones.
        
        ```jsx
        let controller;
        
        async function search(query) {
          controller?.abort();
        
          controller= new AbortController();
        
          try {
            const response = await fetch(`/search?q=${query}`, {
              signal: controller.signal
            });
        
            return await response.json();
          }catch (error) {
            if (error.name=== "AbortError") {
              return;
            }
        
            throw error;
          }
        }
        ```
        
        Now:
        
        ```
        Request: "j"       ❌ cancelled
        Request: "ja"      ❌ cancelled
        Request: "jav"     ❌ cancelled
        Request: "java"    ✅ continues
        ```
        
        This prevents outdated requests from unnecessarily continuing.
        
        ---
        
        # **Pattern 2 — Cancel when Work Is No Longer Needed**
        
        Imagine a page starts loading data:
        
        ```jsx
        const controller = new AbortController();
        
        fetch("/data", {
          signal: controller.signal
        });
        ```
        
        Then the user navigates away.
        
        The operation may no longer be useful.
        
        You can:
        
        ```jsx
        controller.abort();
        ```
        
        This is useful for:
        
        - Search requests
        - Page navigation
        - UI components
        - Large downloads
        - Background operations
        
        ---
        
        # **Pattern 3 — Pass the Signal Through Your Functions**
        
        A very good design is to let your own functions accept a signal.
        
        ```jsx
        async function getUser(id, signal) {
          const response = await fetch(`/users/${id}`, {
            signal
          });
        
          return response.json();
        }
        ```
        
        Then:
        
        ```jsx
        const controller = new AbortController();
        
        getUser(123, controller.signal);
        ```
        
        And elsewhere:
        
        ```jsx
        controller.abort();
        ```
        
        Your function doesn't need to know **why** cancellation happened.
        
        It simply respects the signal.
        
        ---
        
        # **Pattern 4 — Cancellation Propagation**
        
        Suppose:
        
        ```
        Main operation
              ↓
        Get user
              ↓
        Get posts
              ↓
        Get comments
        ```
        
        You can use the same signal:
        
        ```jsx
        async function loadEverything(signal) {
          const user = await getUser(signal);
          const posts = await getPosts(user.id, signal);
          const comments = await getComments(posts, signal);
        
          return comments;
        }
        ```
        
        Now:
        
        ```jsx
        const controller = new AbortController();
        
        loadEverything(controller.signal);
        ```
        
        Calling:
        
        ```jsx
        controller.abort();
        ```
        
        can signal all operations that support that signal.
        
        Think:
        
        ```
                      AbortController
                             ↓
                         AbortSignal
                             ↓
                ┌────────────┼────────────┐
                ↓            ↓            ↓
             getUser     getPosts     getComments
                ↓            ↓            ↓
                     CANCEL
        ```
        
        This is a powerful pattern for larger applications.
        
    - **Cancellation vs Rejection**
        
        This distinction matters.
        
        When an operation is aborted, the Promise usually ends up **rejected**.
        
        So:
        
        ```jsx
        try {
          await fetch(...);
        }catch (error) {
          // cancellation may arrive here
        }
        ```
        
        But conceptually:
        
        ```
        Cancellation
            ↓
        Operation stops
            ↓
        Promise rejects
        ```
        
        Cancellation is the **reason/action**.
        
        Rejection is the **Promise outcome**.
        
        Don't confuse them.
        
        ---
        
        # **⚠️ Cancellation Is Cooperative**
        
        This is probably the most important advanced idea here.
        
        Calling:
        
        ```jsx
        controller.abort();
        ```
        
        doesn't magically stop **any JavaScript function in existence**.
        
        The operation must support the signal.
        
        For example:
        
        ```jsx
        fetch(url, { signal });
        ```
        
        supports it.
        
        But if you write:
        
        ```jsx
        function myFunction() {
          while (true) {
            // ...
          }
        }
        ```
        
        passing a signal doesn't magically stop that loop.
        
        Cancellation usually works like:
        
        ```
        Controller
            ↓
        Signal
            ↓
        Operation checks/listens
            ↓
        Operation stops itself
        ```
        
        So:
        
        > **AbortSignal is a cancellation request, not a magical force that kills arbitrary JavaScript execution.**
        > 
    - **🔑 Remember**
        
        ### **Promise**
        
        > Represents an eventual result. It doesn't have a standard **`.cancel()`** method.
        > 
        
        ### **AbortController**
        
        > Provides a way to request cancellation.
        > 
        
        ```jsx
        const controller = new AbortController();
        
        controller.abort();
        ```
        
        ### **AbortSignal**
        
        > The signal passed to an operation.
        > 
        
        ```jsx
        fetch(url, {
          signal: controller.signal
        });
        ```
        
        ### **Timeout**
        
        ```jsx
        fetch(url, {
          signal: AbortSignal.timeout(5000)
        });
        ```
        
        > Automatically abort after the timeout.
        > 
        
        ### **Combined cancellation**
        
        ```jsx
        AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(5000)
        ]);
        ```
        
        > Abort when **any** of the signals aborts.
        > 
        
        ### **Cancellation pattern**
        
        ```
        Start operation
              ↓
        Give it AbortSignal
              ↓
        Something happens
              ↓
        controller.abort()
              ↓
        Operation stops if it supports cancellation
              ↓
        Promise rejects
              ↓
        Handle cancellation
        ```
        
        > **The key idea:** Promises tell you *what happened*. **`AbortController`** gives you a way to *request that supported work stop happening*.
        > 
- Async Patterns
    - What are Async Patterns
        
        > **Async patterns are reusable ways of controlling asynchronous work.**
        > 
        
        Once you understand Promises, **`async/await`**, cancellation, and concurrency, these patterns start appearing everywhere.
        
    - Retry
        
        Sometimes an operation fails temporarily.
        
        For example:
        
        ```
        Request
          ↓
        ❌ Network error
          ↓
        Try again
          ↓
        ✅ Success
        ```
        
        A simple retry:
        
        ```jsx
        async function retry(fn, attempts) {
          for (let i= 1; i<= attempts; i++) {
            try {
              return await fn();
            }catch (error) {
              if (i=== attempts) {
                throw error;
              }
            }
          }
        }
        ```
        
        Use it:
        
        ```jsx
        const data = await retry(()=> fetch("/data"), 3);
        ```
        
        This means:
        
        ```
        Attempt 1 → ❌
        Attempt 2 → ❌
        Attempt 3 → ✅
        ```
        
        ### **⚠️ Don't retry everything**
        
        Some errors won't magically disappear.
        
        For example, retrying a request that is invalid because of bad input usually doesn't help.
        
        > **Retry makes sense when failure might be temporary.**
        > 
    - Exponential Backoff
        
        Retrying immediately can be a bad idea.
        
        Imagine 10,000 clients all doing:
        
        ```
        ❌ Failed
        ↓
        Immediately retry
        ↓
        ❌ Failed
        ↓
        Immediately retry
        ```
        
        Now you're putting even more pressure on the server.
        
        Instead, wait longer after each failure:
        
        ```
        Attempt 1 → ❌
              ↓ wait 1s
        Attempt 2 → ❌
              ↓ wait 2s
        Attempt 3 → ❌
              ↓ wait 4s
        Attempt 4 → ❌
              ↓ wait 8s
        Attempt 5 → ✅
        ```
        
        This is **exponential backoff**.
        
        The delay grows exponentially:
        
        ```
        1s → 2s → 4s → 8s → 16s
        ```
        
        Example:
        
        ```jsx
        const delay = 1000 * 2 ** attempt;
        ```
        
        Usually you also add **jitter** — a small random amount — so thousands of clients don't all retry at exactly the same moment.
        
        ```
        Exponential backoff + jitter
                  ↓
        More spread-out retries
                  ↓
        Less pressure on the server
        ```
        
    - Timeout
        
        Sometimes an operation takes too long.
        
        Instead of:
        
        ```
        Request
           ↓
        ⏳
        ⏳
        ⏳
        ⏳
        ⏳
        forever...
        ```
        
        set a limit:
        
        ```
        Request
           ↓
        ⏳ 5 seconds
           ↓
        Still not finished?
           ↓
        Cancel
        ```
        
        With **`fetch()`**:
        
        ```jsx
        const response = await fetch("/data", {
          signal: AbortSignal.timeout(5000)
        });
        ```
        
        This means:
        
        > **"Give this request at most 5 seconds."**
        > 
        
        Timeouts are useful because an asynchronous operation shouldn't necessarily be allowed to wait forever.
        
    - Polling
        
        Polling means:
        
        > **Keep asking for something until it reaches the state you want.**
        > 
        
        Imagine processing a video:
        
        ```
        Start processing
              ↓
        "Is it finished?"
              ↓
        No
              ↓
        Wait 2 seconds
              ↓
        "Is it finished?"
              ↓
        No
              ↓
        Wait
              ↓
        "Is it finished?"
              ↓
        Yes ✅
        ```
        
        Example:
        
        ```jsx
        async function poll() {
          while (true) {
            const response = await fetch("/job/status");
        
            const job = await response.json();
        
            if (job.status=== "complete") {
              return job;
            }
        
            await new Promise(resolve=> {
              setTimeout(resolve, 2000);
            });
          }
        }
        ```
        
        Then:
        
        ```jsx
        const job = await poll();
        ```
        
        ### **⚠️ Polling needs limits**
        
        Don't accidentally create:
        
        ```
        Request
        ↓
        Request
        ↓
        Request
        ↓
        Request
        ↓
        forever
        ```
        
        Good polling usually has:
        
        - A delay
        - A maximum number of attempts or maximum time
        - Error handling
        - Cancellation
    - Queues
        
        A queue stores work that needs to be processed.
        
        Think of a line at a restaurant:
        
        ```
        Job A → Job B → Job C → Job D
                            ↓
                        Processor
        ```
        
        Instead of processing everything immediately:
        
        ```jsx
        jobs.forEach(job=> process(job));
        ```
        
        you can put work into a queue:
        
        ```
        Queue:
        [A, B, C, D, E]
        ```
        
        Then a worker takes jobs:
        
        ```
        Take A → process
        Take B → process
        Take C → process
        ```
        
        Queues are useful when:
        
        - Work arrives faster than you can process it
        - You need controlled concurrency
        - You want to process jobs in order
        - You need to buffer work
    - Schedulers
        
        A scheduler answers:
        
        > **"When should this asynchronous work run?"**
        > 
        
        For example:
        
        ```
        Every 10 seconds → check for updates
        Every minute → refresh data
        At 2 PM → send notification
        ```
        
        A simple browser example:
        
        ```jsx
        setInterval(async ()=> {
          await checkForUpdates();
        }, 10000);
        ```
        
        But be careful.
        
        If the operation takes longer than the interval:
        
        ```
        0s   → start A
        10s  → start B
        20s  → start C
        ```
        
        you might accidentally have multiple operations running simultaneously.
        
        A safer sequential scheduler can look like:
        
        ```jsx
        async function schedule() {
          while (true) {
            await checkForUpdates();
        
            await new Promise(resolve=> {
              setTimeout(resolve, 10000);
            });
          }
        }
        ```
        
        Now the next check doesn't start until the previous one finishes.
        
    - Rate Limiting
        
        Rate limiting controls:
        
        > **How frequently something is allowed to happen.**
        > 
        
        Suppose an API allows:
        
        ```
        100 requests / minute
        ```
        
        You shouldn't do:
        
        ```jsx
        for (const user of users) {
          await fetch(`/users/${user.id}`);
        }
        ```
        
        without considering the API's limits.
        
        A rate limiter might enforce:
        
        ```
        Request
        ↓
        wait
        ↓
        Request
        ↓
        wait
        ↓
        Request
        ```
        
        or allow a controlled number within a time window.
        
        ### **Why?**
        
        Without rate limiting:
        
        ```
        Your app
        ████████████████████
                ↓
             API 🚨
        ```
        
        With rate limiting:
        
        ```
        Your app
        ████ ███ ███ ███
                ↓
             API ✅
        ```
        
        Rate limiting protects both your application and the service you're communicating with.
        
    - Concurrency Limiting
        
        Rate limiting and concurrency limiting are related, but **not the same**.
        
        ### **Rate limit**
        
        Controls:
        
        > **How often work starts.**
        > 
        
        Example:
        
        ```
        Maximum: 10 requests/second
        ```
        
        ### **Concurrency limit**
        
        Controls:
        
        > **How many operations can be active at once.**
        > 
        
        Example:
        
        ```
        Maximum: 3 active requests
        ```
        
        You could have:
        
        ```
        Request A ──────────────→
        Request B ───────→
        Request C ─────────→
        
        Request D waits...
        ```
        
        When one finishes:
        
        ```
        Request D ───────→
        ```
        
    - Promise Pools
        
        A Promise pool is a practical way to implement concurrency limits.
        
        Suppose:
        
        ```jsx
        const jobs = [
          job1,
          job2,
          job3,
          job4,
          job5,
          job6
        ];
        ```
        
        You want only **2 jobs running at once**.
        
        ```
        Worker 1 → Job 1
        Worker 2 → Job 2
        
        Job 3 waits
        Job 4 waits
        Job 5 waits
        Job 6 waits
        ```
        
        When Job 1 finishes:
        
        ```
        Worker 1 → Job 3
        Worker 2 → Job 2
        ```
        
        Then:
        
        ```
        Worker 1 → Job 3
        Worker 2 → Job 4
        ```
        
        And so on.
        
        Conceptually:
        
        ```jsx
        const poolSize = 2;
        ```
        
        A pool is basically:
        
        ```
                     Queue
              ┌─────────────────┐
              │ 3  4  5  6 ...  │
              └────────┬────────┘
                       ↓
                ┌──────────────┐
                │    POOL      │
                │              │
                │ Worker 1     │
                │ Worker 2     │
                └──────────────┘
        ```
        
        This prevents:
        
        ```
        1000 jobs
           ↓
        1000 operations started 😵
        ```
        
        and gives you:
        
        ```
        1000 jobs
           ↓
        2 at a time
           ↓
        controlled resource usage
        ```
        
    - **How These Patterns Fit Together**
        
        These aren't isolated techniques.
        
        They often work **together**.
        
        Imagine an API request system:
        
        ```
                          Incoming jobs
                               ↓
                             Queue
                               ↓
                        Concurrency limit
                               ↓
                         Promise pool
                               ↓
                          Make request
                               ↓
                        ┌──────┴──────┐
                        ↓             ↓
                      Success       Failure
                        ↓             ↓
                       Done         Retry
                                      ↓
                               Exponential
                                 backoff
                                      ↓
                                   Retry
                                      ↓
                                 Timeout?
                                      ↓
                                    Stop
        ```
        
        You might also add:
        
        ```
        Rate limiting
             ↓
        Don't start too many requests per second
        ```
        
        and:
        
        ```
        Cancellation
             ↓
        Stop work that is no longer needed
        ```
        
    - **🔑 Quick Reference**
        
        
        | **Pattern** | **Main question it answers** |
        | --- | --- |
        | **Retry** | "Should I try again?" |
        | **Exponential backoff** | "How long should I wait before retrying?" |
        | **Timeout** | "How long am I willing to wait?" |
        | **Polling** | "Should I check again later?" |
        | **Queue** | "Where do I keep work waiting to be processed?" |
        | **Scheduler** | "When should this work start?" |
        | **Rate limiting** | "How frequently can work start?" |
        | **Concurrency limiting** | "How many operations can run at once?" |
        | **Promise pool** | "How do I enforce that concurrency limit?" |
        
        ---
        
    - **🔑 The Big Idea**
        
        Most real-world async systems aren't just:
        
        ```jsx
        await fetch(...)
        ```
        
        They're more like:
        
        ```
                     ASYNC WORK
                         │
                ┌────────┼────────┐
                ↓        ↓        ↓
              Queue    Retry    Timeout
                │        │        │
                └────┬───┴────────┘
                     ↓
              Concurrency limit
                     ↓
               Promise pool
                     ↓
                 Execute
                     ↓
               Success / Error
        ```
        
        > **Async patterns are about controlling asynchronous work — how often it runs, how many things run, how long you wait, what happens when it fails, and what happens when too much work arrives.**
        > 
- Testing Async JavaScript
    - What this means!
        
        > **Testing async code means checking what happens now, what happens later, and what happens when something fails.**
        > 
        
        The biggest rule:
        
        > **If your code returns a Promise, your test usually needs to wait for that Promise.**
        > 
    - Testing Promises
        
        Suppose:
        
        ```jsx
        function getUser() {
          return Promise.resolve({
            name: "Alice"
          });
        }
        ```
        
        A test shouldn't check the Promise itself:
        
        ```jsx
        // ❌ Not enough
        expect(getUser()).toBe(...);
        ```
        
        Instead, wait for it:
        
        ```jsx
        const user = await getUser();
        
        expect(user.name).toBe("Alice");
        ```
        
        A test function can itself be **`async`**:
        
        ```jsx
        test("gets a user", async ()=> {
          const user = await getUser();
        
          expect(user.name).toBe("Alice");
        });
        ```
        
        The important idea:
        
        ```
        Test starts
           ↓
        await Promise
           ↓
        Promise settles
           ↓
        assert result
           ↓
        test finishes
        ```
        
    - Testing async/await
        
        Imagine:
        
        ```jsx
        async function getUsername() {
          const user = await getUser();
        
          return user.name;
        }
        ```
        
        Test it like normal synchronous code:
        
        ```jsx
        test("returns username", async ()=> {
          const name = await getUsername();
        
          expect(name).toBe("Alice");
        });
        ```
        
        **`async/await`** makes asynchronous tests look almost like synchronous tests.
        
        ---
        
        ## **⚠️ A common mistake**
        
        Don't forget **`await`**:
        
        ```jsx
        test("returns username", ()=> {
          const result = getUsername();
        
          expect(result).toBe("Alice");
        });
        ```
        
        **`result`** is a Promise, not **`"Alice"`**.
        
        Correct:
        
        ```jsx
        test("returns username", async ()=> {
          const result = await getUsername();
        
          expect(result).toBe("Alice");
        });
        ```
        
    - Testing Errors
        
        Suppose:
        
        ```jsx
        async function getUser() {
          throw new Error("User not found");
        }
        ```
        
        You want to verify that it rejects.
        
        With a Jest/Vitest-style API:
        
        ```jsx
        test("throws when user is missing", async ()=> {
          await expect(getUser())
            .rejects
            .toThrow("User not found");
        });
        ```
        
        Or manually:
        
        ```jsx
        test("throws when user is missing", async ()=> {
          try {
            await getUser();
        
            throw new Error("Expected getUser() to fail");
          }catch (error) {
            expect(error.message).toBe("User not found");
          }
        });
        ```
        
        The first version is usually cleaner.
        
        ---
        
        ## **Fulfillment vs rejection**
        
        Remember:
        
        ```
        Promise
         ├── fulfilled → success
         └── rejected  → error
        ```
        
        Your tests should test both.
        
        ```jsx
        test("success", async ()=> {
          const result = await getData();
        
          expect(result).toBe(...);
        });
        ```
        
        and:
        
        ```jsx
        test("failure", async ()=> {
          await expect(getData())
            .rejects
            .toThrow();
        });
        ```
        
    - Testing Timeouts
        
        Timeouts can make tests slow.
        
        Imagine:
        
        ```jsx
        await new Promise(resolve=> {
          setTimeout(resolve, 5000);
        });
        ```
        
        A test shouldn't have to actually wait 5 seconds every time.
        
        Instead, testing libraries often provide **fake timers**.
        
        Conceptually:
        
        ```
        Real timer:
        
        wait 5 seconds
              ↓
        continue
        
        Fake timer:
        
        "Move time forward 5 seconds."
              ↓
        continue immediately
        ```
        
        For example, with Jest-style fake timers:
        
        ```jsx
        jest.useFakeTimers();
        ```
        
        Then:
        
        ```jsx
        jest.advanceTimersByTime(5000);
        ```
        
        Now the test can simulate 5 seconds passing without actually waiting 5 seconds.
        
        ---
        
        ## **Example**
        
        Suppose:
        
        ```jsx
        function wait() {
          return new Promise(resolve=> {
            setTimeout(resolve, 5000);
          });
        }
        ```
        
        Instead of:
        
        ```jsx
        await wait();// 😴 actually waits 5 seconds
        ```
        
        you can control the timer in the test.
        
        The exact timer APIs differ between test frameworks, but the idea is the same:
        
        > **Control time instead of actually waiting for it.**
        > 
    - Testing Retries
        
        Suppose your code retries a failed operation:
        
        ```
        Attempt 1 → ❌
        Attempt 2 → ❌
        Attempt 3 → ✅
        ```
        
        You should test that behavior.
        
        For example, mock the operation:
        
        ```jsx
        const mockRequest = jest
          .fn()
          .mockRejectedValueOnce(new Error("Failed"))
          .mockRejectedValueOnce(new Error("Failed"))
          .mockResolvedValue("Success");
        ```
        
        Then:
        
        ```jsx
        const result = await retry(mockRequest, 3);
        
        expect(result).toBe("Success");
        expect(mockRequest).toHaveBeenCalledTimes(3);
        ```
        
        You're testing two things:
        
        ```
        Did it eventually succeed?
                +
        Did it retry the correct number of times?
        ```
        
        ---
        
        ## **Test when all retries fail**
        
        Don't only test success.
        
        ```
        Attempt 1 → ❌
        Attempt 2 → ❌
        Attempt 3 → ❌
                     ↓
                  throw error
        ```
        
        Example:
        
        ```jsx
        const request = jest
          .fn()
          .mockRejectedValue(new Error("Server down"));
        
        await expect(
          retry(request, 3)
        ).rejects.toThrow("Server down");
        
        expect(request).toHaveBeenCalledTimes(3);
        ```
        
    - Testing Concurrency
        
        This one is more interesting.
        
        Suppose you have:
        
        ```jsx
        await Promise.all([
          taskA(),
          taskB(),
          taskC()
        ]);
        ```
        
        You want to verify that they can run concurrently.
        
        A useful technique is to control when each Promise resolves.
        
        For example:
        
        ```jsx
        let resolveA;
        let resolveB;
        
        const a = new Promise(resolve=> {
          resolveA= resolve;
        });
        
        const b = new Promise(resolve=> {
          resolveB= resolve;
        });
        ```
        
        Then your test can control them:
        
        ```
        Start A
        Start B
        
        A hasn't finished
        B hasn't finished
        
        Resolve B
        
        B finishes
        
        Resolve A
        
        A finishes
        ```
        
        This lets you test the **order and interaction** of asynchronous operations without relying on real network delays.
        
    - Testing Concurrency Limits
        
        Suppose your application allows only:
        
        ```
        3 operations at once
        ```
        
        You want to verify:
        
        ```
        Running: 1 2 3
        Waiting: 4 5 6
        
        One finishes
        
        Running: 2 3 4
        Waiting: 5 6
        ```
        
        A useful test keeps track of active operations:
        
        ```jsx
        let active= 0;
        let maximum= 0;
        
        async function task() {
          active++;
        
          maximum= Math.max(maximum, active);
        
          await doSomething();
        
          active--;
        }
        ```
        
        After running your pool:
        
        ```jsx
        expect(maximum).toBeLessThanOrEqual(3);
        ```
        
        This tests the actual guarantee:
        
        > **Never have more than 3 operations running at once.**
        > 
    - **🧠 Testing Async Code: What Are You Actually Testing?**
        
        Async tests usually fall into a few categories.
        
        ### **1. Result**
        
        ```
        Did I get the correct value?
        ```
        
        ### **2. Error**
        
        ```
        Did the Promise reject correctly?
        ```
        
        ### **3. Timing**
        
        ```
        Did something happen after the expected delay?
        ```
        
        ### **4. Retry behavior**
        
        ```
        Did we try again the correct number of times?
        ```
        
        ### **5. Concurrency**
        
        ```
        Did operations run together / stay within the limit?
        ```
        
        ### **6. Ordering**
        
        ```
        Did A happen before B?
        ```
        
        # **🔑 The Golden Rule**
        
        When testing asynchronous code:
        
        ```
        Start async operation
                ↓
               WAIT
                ↓
        Promise settles
                ↓
           Make assertion
        ```
        
        Not:
        
        ```
        Start async operation
                ↓
        Immediately assert ❌
        ```
        
        ---
        
        # **⚠️ One Last Important Thing**
        
        Avoid tests that depend on real time whenever possible.
        
        Bad:
        
        ```jsx
        await new Promise(resolve=>
          setTimeout(resolve, 5000)
        );
        ```
        
        Better:
        
        ```
        Fake the timer
             ↓
        Advance time
             ↓
        Test immediately
        ```
        
        Likewise, avoid depending on real network requests:
        
        ```
        Test
         ↓
        Internet
         ↓
        Real server
         ↓
        Response
        ```
        
        Prefer controlled mocks/fakes:
        
        ```
        Test
         ↓
        Mock request
         ↓
        Controlled response
        ```
        
        This makes tests:
        
        - Faster
        - More reliable
        - Easier to reproduce
        - Easier to understand
        
        > **The goal of async testing isn't to make the test wait. It's to make the test control and observe asynchronous behavior.**
        > 
- Debugging Async JavaScript
    - **Debugging Async JavaScript**
        
        > **Async bugs are difficult because the code that starts something and the code that finishes it may run at different times.**
        > 
        
        The main challenge is figuring out:
        
        **"What happened, in what order, and why?"**
        
    - Async Stack Traces
        
        A **stack trace** tells you where an error came from.
        
        Example:
        
        ```jsx
        async function getUser() {
          throw new Error("User failed");
        }
        
        async function main() {
          await getUser();
        }
        
        main();
        ```
        
        You might see something like:
        
        ```
        Error: User failed
            at getUser (...)
            at main (...)
        ```
        
        This tells you the path:
        
        ```
        main()
          ↓
        getUser()
          ↓
        Error
        ```
        
        ---
        
        ## **Why async stack traces can be confusing**
        
        With asynchronous code, execution can be split:
        
        ```
        main()
          ↓
        await
          ↓
        ⏳ asynchronous work
          ↓
        later...
          ↓
        continue
          ↓
        error
        ```
        
        The error happens **later**, after the original function has paused.
        
        Modern JavaScript runtimes and developer tools often preserve useful async context, but the stack trace can still be harder to follow than a purely synchronous one.
        
        ### **Debugging tip**
        
        When you see an async error, ask:
        
        ```
        Where did the error happen?
                ↓
        What async operation was running?
                ↓
        Who started that operation?
                ↓
        What happened between those two points?
        ```
        
    - Unhandled Rejections
        
        A Promise can reject:
        
        ```jsx
        Promise.reject(new Error("Something went wrong"));
        ```
        
        If nobody handles that rejection, you have an **unhandled Promise rejection**.
        
        For example:
        
        ```jsx
        async function main() {
          throw new Error("Boom!");
        }
        
        main();
        ```
        
        **`main()`** returns a rejected Promise.
        
        But nobody handles it:
        
        ```
        main()
         ↓
        Promise rejects
         ↓
        ❌ Nobody catches it
        ```
        
        That's an **unhandled rejection**.
        
        ---
        
        ## **Handle it**
        
        Use:
        
        ```jsx
        main().catch(error=> {
          console.error(error);
        });
        ```
        
        Or inside an async function:
        
        ```jsx
        try {
          await main();
        }catch (error) {
          console.error(error);
        }
        ```
        
        ---
        
        ## **Why it matters**
        
        Unhandled rejections can indicate:
        
        - A forgotten **`await`**
        - A missing **`.catch()`**
        - A failed background operation
        - A bug that nobody is handling
        
        If you see something like:
        
        ```
        UnhandledPromiseRejection
        ```
        
        don't simply ignore it.
        
        Find the Promise that rejected and decide what should happen to that error.
        
    - Race Conditions
        
        A **race condition** happens when the result depends on which asynchronous operation finishes first.
        
        Example:
        
        ```jsx
        let user;
        
        async function loadUser() {
          user= await getUser();
        }
        
        async function loadGuest() {
          user= await getGuest();
        }
        ```
        
        Suppose both start:
        
        ```
        loadUser()
            ↓
            ⏳
        
        loadGuest()
            ↓
            ⏳
        ```
        
        If the guest request finishes first:
        
        ```
        Guest → finishes → user = Guest
        User  → finishes → user = User
        ```
        
        Final value:
        
        ```
        User
        ```
        
        But if the user request finishes first:
        
        ```
        User  → finishes → user = User
        Guest → finishes → user = Guest
        ```
        
        Final value:
        
        ```
        Guest
        ```
        
        Same code.
        
        Different timing.
        
        Different result.
        
        🚨 That's a race condition.
        
        ---
        
        ## **A common real-world example**
        
        Search:
        
        ```
        User types:
        
        "j"
         ↓
        Request A
        
        "ja"
         ↓
        Request B
        
        "jav"
         ↓
        Request C
        ```
        
        Imagine:
        
        ```
        A → finishes last
        B → finishes first
        C → finishes second
        ```
        
        If you blindly display every response:
        
        ```
        B result → displayed
        C result → displayed
        A result → displayed ❌
        ```
        
        The UI ends up showing results for **`"j"`** even though the user searched for **`"jav"`**.
        
        ---
        
        ## **Fixing races**
        
        One approach is cancellation:
        
        ```jsx
        controller.abort();
        ```
        
        Another is tracking which request is the latest:
        
        ```jsx
        let requestId= 0;
        
        async function search(query) {
          const id = ++requestId;
        
          const result = await getResults(query);
        
          if (id!== requestId) {
            return;
          }
        
          display(result);
        }
        ```
        
        Now an old request can't overwrite a newer result.
        
        The important principle:
        
        > **Don't assume asynchronous operations finish in the order they started.**
        > 
    - Deadlocks
        
        A **deadlock** happens when operations are waiting for each other forever.
        
        Imagine:
        
        ```
        A waits for B
        B waits for A
        ```
        
        Neither can continue.
        
        ```
        A ──waits──→ B
        ↑            │
        └──waits─────┘
        ```
        
        JavaScript's single-threaded model means classic thread-lock deadlocks are less common than in multithreaded languages.
        
        But you can still create **logical deadlocks** with Promises.
        
        For example:
        
        ```jsx
        let resolveA;
        let resolveB;
        
        const a = new Promise(resolve=> {
          resolveA= resolve;
        });
        
        const b = new Promise(resolve=> {
          resolveB= resolve;
        });
        
        await a;
        await b;
        ```
        
        If nothing ever calls:
        
        ```jsx
        resolveA();
        ```
        
        then **`a`** never settles.
        
        The code waits forever.
        
        ---
        
        ## **Another common problem**
        
        ```jsx
        async function a() {
          await b();
        }
        
        async function b() {
          await a();
        }
        ```
        
        You've created a circular dependency:
        
        ```
        a()
         ↓
        b()
         ↓
        a()
         ↓
        b()
         ↓
        ...
        ```
        
        The lesson:
        
        > **Every async dependency should eventually be able to make progress toward completion.**
        > 
    - Debugging Concurrency
        
        Concurrency bugs are difficult because logs can appear in surprising orders.
        
        Suppose:
        
        ```jsx
        async function task(name) {
          console.log(`${name} started`);
        
          await doSomething();
        
          console.log(`${name} finished`);
        }
        ```
        
        Run:
        
        ```jsx
        task("A");
        task("B");
        task("C");
        ```
        
        You might see:
        
        ```
        A started
        B started
        C started
        B finished
        C finished
        A finished
        ```
        
        That's completely valid.
        
        The operations started in order:
        
        ```
        A → B → C
        ```
        
        but finished in a different order:
        
        ```
        B → C → A
        ```
        
        ---
        
        ## **Use useful logging**
        
        Instead of:
        
        ```jsx
        console.log("finished");
        ```
        
        include context:
        
        ```jsx
        console.log("Task A finished");
        ```
        
        Even better:
        
        ```jsx
        console.log({
          task: "A",
          event: "finished",
          time: Date.now()
        });
        ```
        
        Now you can reconstruct what happened.
        
    - **A Useful Debugging Technique**
        
        When debugging concurrency, track:
        
        ```
        1. What started?
        2. When did it start?
        3. What is it waiting for?
        4. When did it finish?
        5. Did it fail?
        6. Who handled the failure?
        7. What other operations were running?
        ```
        
        For example:
        
        ```
        10:00:00  A started
        10:00:00  B started
        10:00:01  B finished
        10:00:02  C started
        10:00:04  A failed
        10:00:05  C finished
        ```
        
        Suddenly the async behavior becomes much easier to understand.
        
    - **Common Async Bugs**
        
        ### **Forgotten `await`**
        
        ```jsx
        const data = getData();
        console.log(data);
        ```
        
        You're logging the Promise instead of its result.
        
        ---
        
        ### **Missing error handling**
        
        ```jsx
        doSomethingAsync();
        ```
        
        The Promise might reject without anyone handling it.
        
        ---
        
        ### **Accidental sequential execution**
        
        ```jsx
        await a();
        await b();
        await c();
        ```
        
        You might have intended:
        
        ```jsx
        await Promise.all([
          a(),
          b(),
          c()
        ]);
        ```
        
        ---
        
        ### **Accidental concurrency**
        
        You might do:
        
        ```jsx
        a();
        b();
        c();
        ```
        
        when **`b`** actually depends on **`a`**.
        
        ---
        
        ### **Race condition**
        
        ```
        Older operation finishes after newer operation
               ↓
        Older result overwrites newer result
        ```
        
        ---
        
        ### **Infinite waiting**
        
        ```
        await Promise that never settles
        ```
        
    - **Debugging Checklist**
        
        When an async operation appears to be "stuck":
        
        ```
                   Is the Promise pending?
                            ↓
                          YES
                            ↓
                What is it waiting for?
                            ↓
               ┌────────────┼────────────┐
               ↓            ↓            ↓
            Network       Timer       Another
                                        Promise
        ```
        
        If it fails:
        
        ```
        Promise rejected
              ↓
        Was it caught?
              ↓
           NO → Unhandled rejection
           YES → Inspect the error
        ```
        
        If the result is wrong:
        
        ```
        Could operations finish
        in different orders?
                ↓
               YES
                ↓
        Potential race condition
        ```
        
        If it never finishes:
        
        ```
        Is something waiting
        for something else?
                ↓
               YES
                ↓
        Check for circular dependencies
        or a Promise that never settles
        ```
        
    - **🔑 Remember**
        
        ### **Async stack traces**
        
        > Show where asynchronous errors came from, but async execution can make the path harder to follow.
        > 
        
        ### **Unhandled rejection**
        
        > A Promise rejected and nobody handled the rejection.
        > 
        
        ### **Race condition**
        
        > The result depends on the timing/order of asynchronous operations.
        > 
        
        ### **Deadlock**
        
        > Operations are waiting in a way that prevents progress.
        > 
        
        ### **Debugging concurrency**
        
        > Track **who started, what they're waiting for, when they finished, and what order everything happened in.**
        > 
        
        ---
        
        # **🧠 The Most Important Mental Model**
        
        When synchronous code goes wrong, you often ask:
        
        > **"What line ran incorrectly?"**
        > 
        
        When asynchronous code goes wrong, ask:
        
        > **"What happened, what was waiting, and in what order did everything actually happen?"**
        > 
        
        That's the mindset that makes async bugs much easier to solve.
        
        ```
        START
          ↓
        Operation A ──────→ ?
          ↓
        await
          ↓
        Operation B ──────→ ?
          ↓
        Promise settles
          ↓
        Continue
          ↓
        Result / Error
        ```
        
        > **Async debugging is mostly about reconstructing the timeline.**
        > 
- Interview Questions
    
    ### 1–10: Async fundamentals
    
    - How can we write code to avoid blocking the event loop?
        
        > **Don't keep the JavaScript thread busy with long-running synchronous work.** Let the event loop handle small pieces of work and move expensive work elsewhere when necessary.
        > 
        
        ### **1. Don't do huge synchronous computations**
        
        This blocks the event loop:
        
        ```jsx
        const result = hugeCalculation();
        ```
        
        If **`hugeCalculation()`** takes 5 seconds, **nothing else can run on that JavaScript thread for 5 seconds**.
        
        Instead, break the work into smaller chunks or move it to a worker.
        
        ### **2. Use asynchronous APIs for I/O**
        
        Don't manually block while waiting for things like files, databases, or networks.
        
        Prefer:
        
        ```jsx
        const data = await fetchData();
        ```
        
        rather than a synchronous/blocking API.
        
        While the I/O is happening, the event loop can handle other work.
        
        ### **3. Be careful with loops**
        
        This can block the event loop:
        
        ```jsx
        for (let i= 0; i< 1_000_000_000; i++) {
          doSomething(i);
        }
        ```
        
        If the work is genuinely expensive, split it up:
        
        ```jsx
        function processChunk(items, start) {
          const end = Math.min(start+ 1000, items.length);
        
          for (let i= start; i< end; i++) {
            doSomething(items[i]);
          }
        
          if (end< items.length) {
            setImmediate(()=> processChunk(items, end));
          }
        }
        ```
        
        Now the event loop gets opportunities to process other work between chunks.
        
        ### **4. Move CPU-heavy work to workers**
        
        If the computation itself is expensive, **`async/await`** **doesn't solve the problem**.
        
        This:
        
        ```jsx
        await expensiveCalculation();
        ```
        
        doesn't make the calculation automatically non-blocking if **`expensiveCalculation()`** is synchronous CPU work.
        
        Instead, use something like:
        
        ```
        Main thread
            │
            ├── handles requests/events
            │
            └── sends heavy calculation
                      ↓
                 Worker thread
                      ↓
                 does calculation
                      ↓
                 returns result
        ```
        
        In Node.js, this means **Worker Threads**; in browsers, **Web Workers**.
        
        ### **5. Don't confuse asynchronous with non-blocking**
        
        This is crucial:
        
        ```jsx
        async function calculate() {
          // huge synchronous loop
        }
        ```
        
        The function is technically **`async`**, but the CPU-heavy code inside can still block the event loop.
        
        So:
        
        > **`async` doesn't automatically make code non-blocking.**
        > 
        
        **`async/await`** is particularly useful for **waiting on I/O**, whereas CPU-heavy work needs **chunking or worker threads**.
        
        ### **Easy rule to remember**
        
        ```
        I/O takes time
            ↓
        Use async APIs / await
            ↓
        Event loop can keep working
        
        CPU work takes time
            ↓
        Don't just use await
            ↓
        Chunk it OR use a worker
        ```
        
        The ultimate goal is:
        
        > **Keep each individual piece of JavaScript work on the event loop short enough that other work gets a chance to run.**
        > 
        
        Avoid long synchronous/CPU-heavy operations on the main thread. Use asynchronous I/O, chunk large computations, stream data, cache results, or move CPU-intensive work to Worker Threads/Web Workers.
        
        Don't make JavaScript wait doing a long task. Use asynchronous APIs, split big tasks into smaller pieces, or move heavy work to a Worker.
        
    - How can we handle a blocked event loop to exit the blocking state from the same process
        
        If the event loop is **already blocked by synchronous JavaScript**, the important answer is:
        
        > **You cannot use asynchronous code to escape the blocking code from the same JavaScript thread.**
        > 
        
        For example:
        
        ```jsx
        while (true) {
          // blocks forever
        }
        
        setTimeout(()=> {
          console.log("stop");
        }, 1000);
        ```
        
        The timer **cannot run**, because the event loop never gets control back.
        
        ### **Why?**
        
        JavaScript on the main thread is effectively:
        
        ```
        run synchronous code
               ↓
        event loop gets control
               ↓
        run next callback
               ↓
        event loop gets control
               ↓
        ...
        ```
        
        But if you do:
        
        ```jsx
        while (true) {}
        ```
        
        you get:
        
        ```
        run synchronous code
               ↓
               ↓
               ↓
        NEVER RETURNS
        ```
        
        The event loop never gets another opportunity to execute the timer.
        
        ### **What can you do from the same process?**
        
        If you **control the blocking code**, you need to make it periodically yield:
        
        ```jsx
        function process(items) {
          let i= 0;
        
          function chunk() {
            const end = Math.min(i+ 1000, items.length);
        
            while (i< end) {
              doExpensiveWork(items[i]);
              i++;
            }
        
            if (i< items.length) {
              setImmediate(chunk);
            }
          }
        
          chunk();
        }
        ```
        
        Now:
        
        ```
        chunk 1
          ↓
        event loop gets control
          ↓
        chunk 2
          ↓
        event loop gets control
          ↓
        chunk 3
          ↓
        ...
        ```
        
        This lets timers, I/O, requests, etc. run between chunks.
        
        ### **But if you don't control the blocking code?**
        
        Suppose some library does:
        
        ```jsx
        someLibraryThatBlocksForever();
        ```
        
        Once you're inside that synchronous function, **your JavaScript code cannot interrupt it from the same thread**.
        
        You need to prevent it from blocking the main thread in the first place—for example, run it in a **worker thread/process** that can be terminated independently.
        
        ```
        Main process
             │
             ├── event loop stays responsive
             │
             └── Worker
                   │
                   └── blocking operation
        ```
        
        If the worker gets stuck, the main process can terminate the worker.
        
        ### **The key distinction**
        
        There are two situations:
        
        **You control the work:**
        
        > Break it into chunks and yield back to the event loop.
        > 
        
        **You don't control the work / it can block indefinitely:**
        
        > Put it in another worker/process so it can't freeze your main event loop.
        > 
        
        And the most important thing to remember:
        
        > **Once synchronous JavaScript has blocked the event loop, nothing asynchronous on that same thread can "break in" and stop it. The blocking code must return/yield, or the work must be isolated to another thread/process.**
        > 
        
        CONCLUSION: You can't forcibly interrupt normal JavaScript running on the same thread. You must let it finish, split the work into smaller pieces, or move it to a Worker.
        
    - What is callback hell, and how can we avoid it?
        
        
        Callback hell is deeply nested callbacks that make control flow and error handling difficult. Avoid it with Promises, `async/await`, named functions, and modularizing operations.
        
        **Callback hell** is having callbacks inside callbacks inside callbacks.
        
        ```jsx
        doA(() => {
          doB(() => {
            doC(() => {});
          });
        });
        ```
        
        Avoid it using **Promises** and **`async/await`**.
        
    - How does async make a function to return a Promise?
        
        Because **JavaScript defines `async` functions that way**: an **`async`** function **always wraps its return value in a Promise**.
        
        For example:
        
        ```jsx
        async function hello() {
          return "hello";
        }
        
        const result = hello();
        
        console.log(result);
        // Promise { "hello" }
        ```
        
        Even though you wrote:
        
        ```jsx
        return "hello";
        ```
        
        JavaScript essentially treats it like:
        
        ```jsx
        return Promise.resolve("hello");
        ```
        
        So:
        
        ```jsx
        hello().then(value=> {
          console.log(value);// "hello"
        });
        ```
        
        And if the function throws an error:
        
        ```jsx
        async function test() {
          throw new Error("Oops");
        }
        ```
        
        the returned Promise is **rejected** rather than the error simply being thrown to the caller.
        
        **Simple mental model:**
        
        > **`async`** tells JavaScript: **"Whatever this function returns, put it inside a Promise."**
        > 
    - What are async generators and iterators, how do they work, and what are their use cases?
        
        An async iterator produces values asynchronously through `next()`, returning Promises. An async generator (`async function*`) makes creating them easy. They're useful for streaming data, paginated APIs, files, and database results.
        
        ## **1. First: what is an iterator?**
        
        An **iterator** is an object that lets you get values **one at a time**.
        
        It has a **`.next()`** method:
        
        ```jsx
        const iterator = [10, 20, 30]Symbol.iterator;
        
        iterator.next();
        // { value: 10, done: false }
        
        iterator.next();
        // { value: 20, done: false }
        
        iterator.next();
        // { value: 30, done: false }
        
        iterator.next();
        // { value: undefined, done: true }
        ```
        
        The important idea is:
        
        > **Iterator = something that can give you the next value.**
        > 
        
        ---
        
        ## **2. What is an async iterator?**
        
        An **async iterator** does the same thing, except getting the next value may require waiting.
        
        Its **`.next()`** returns a **Promise**:
        
        ```jsx
        const result = await asyncIterator.next();
        ```
        
        Instead of:
        
        ```
        iterator.next()
            ↓
        { value, done }
        ```
        
        you have:
        
        ```
        asyncIterator.next()
            ↓
        Promise
            ↓
        { value, done }
        ```
        
        So:
        
        > **Async iterator = "Give me the next value when it's ready."**
        > 
        
        This is useful when values arrive over time, such as data from a network, a stream, or a database.
        
        ---
        
        # **3. What is a generator?**
        
        A **generator** is a convenient way to create an iterator.
        
        You use:
        
        ```jsx
        function*
        ```
        
        and:
        
        ```jsx
        yield
        ```
        
        For example:
        
        ```jsx
        function* numbers() {
          yield 1;
          yield 2;
          yield 3;
        }
        ```
        
        Calling the function gives you an iterator:
        
        ```jsx
        const iterator = numbers();
        ```
        
        Then:
        
        ```jsx
        iterator.next();
        // { value: 1, done: false }
        
        iterator.next();
        // { value: 2, done: false }
        ```
        
        **`yield`** means:
        
        > **"Give this value to the caller, then pause me."**
        > 
        
        The next **`.next()`** resumes the generator.
        
        ---
        
        # **4. So what is an async generator?**
        
        An **async generator** combines:
        
        - generator → **`yield`**
        - asynchronous code → **`async`** / **`await`**
        
        Syntax:
        
        ```jsx
        async function* numbers() {
          yield 1;
          yield 2;
          yield 3;
        }
        ```
        
        Calling it gives you an **async iterator**:
        
        ```jsx
        const iterator = numbers();
        ```
        
        And:
        
        ```jsx
        await iterator.next();
        ```
        
        gives:
        
        ```jsx
        { value: 1, done: false }
        ```
        
        The difference is that **`.next()`** returns a Promise.
        
        So the relationship is:
        
        ```
        async generator
              ↓
        produces
              ↓
        async iterator
              ↓
        .next()
              ↓
        Promise<{ value, done }>
        ```
        
        This is the most important relationship to remember.
        
        ---
        
        # **5. Why do we need async generators?**
        
        Consider an API that returns pages of data.
        
        You might have:
        
        ```
        Request page 1
             ↓
        wait
             ↓
        receive page 1
        
        Request page 2
             ↓
        wait
             ↓
        receive page 2
        
        Request page 3
             ↓
        wait
             ↓
        receive page 3
        ```
        
        You could manually manage all of this.
        
        Or you could make it an async generator:
        
        ```jsx
        async function* getPages() {
          let page = 1;
        
          while (true) {
            const response = await fetch(`/api/items?page=${page}`);
            const data = await response.json();
        
            if (data.items.length === 0) {
              break;
            }
        
            yield data.items;
            page++;
          }
        }
        ```
        
        Now the consumer can simply do:
        
        ```jsx
        for await (const items of getPages()) {
          console.log(items);
        }
        ```
        
        The generator handles:
        
        ```
        fetch
         ↓
        await
         ↓
        yield
         ↓
        pause
         ↓
        fetch
         ↓
        await
         ↓
        yield
         ↓
        pause
         ↓
        ...
        ```
        
        ---
        
        # **6. What does `for await...of` do?**
        
        This:
        
        ```jsx
        for await (const item of getItems()) {
          console.log(item);
        }
        ```
        
        basically means:
        
        > "Keep asking this async iterator for its next value, and wait for each value before processing it."
        > 
        
        Conceptually:
        
        ```
        next()
         ↓
        await Promise
         ↓
        get value
         ↓
        process value
         ↓
        next()
         ↓
        await Promise
         ↓
        get value
         ↓
        process value
         ↓
        ...
        ```
        
        So **`for await...of`** is the convenient way of consuming an async iterator.
        
        ---
        
        # **7. Async iterator vs async generator**
        
        This distinction is important.
        
        ### **Async iterator**
        
        Describes the **interface/thing being consumed**.
        
        It has:
        
        ```jsx
        next()
        ```
        
        which returns a Promise.
        
        ### **Async generator**
        
        Describes a **function that creates an async iterator**.
        
        ```jsx
        async function* getData() {
          yield something;
        }
        ```
        
        So:
        
        ```
        Async generator
              ↓ creates
        Async iterator
              ↓ consumed with
        for await...of
        ```
        
        Think of a generator as the **factory**, and the iterator as the **thing that gives you the values**.
        
        ---
        
        # **8. Why not just return an array?**
        
        Suppose you have 1 million records.
        
        You could do:
        
        ```jsx
        const data = await getAllRecords();
        ```
        
        and wait for everything:
        
        ```
        1 million records
               ↓
        load everything
               ↓
        process everything
        ```
        
        An async generator can instead give you pieces:
        
        ```
        100 records → process
        100 records → process
        100 records → process
        100 records → process
        ...
        ```
        
        You don't necessarily need the entire dataset in memory at once.
        
        That's one of the major advantages.
        
        ---
        
        # **9. Main use cases**
        
        ### **Streaming**
        
        Data arrives progressively:
        
        ```
        chunk → chunk → chunk → chunk
        ```
        
        You can process each chunk as it becomes available.
        
        ### **Pagination**
        
        Fetch:
        
        ```
        page 1 → yield
        page 2 → yield
        page 3 → yield
        ```
        
        without making the consumer manage the pagination logic.
        
        ### **Large files**
        
        Read a large file in chunks rather than loading the entire thing into memory.
        
        ### **Real-time data**
        
        Events might arrive over time:
        
        ```
        event 1
           ↓
        event 2
           ↓
        event 3
           ↓
        event 4
        ```
        
        An async iterator provides a natural way to consume them sequentially.
        
        ---
        
        # **10. Promise vs async iterator vs async generator**
        
        This is probably the best way to memorize the whole concept:
        
        ```
        Promise
           ↓
        "I'll give you ONE result later."
        
        Async Iterator
           ↓
        "Ask me for the NEXT result.
         It might take some time."
        
        Async Generator
           ↓
        "I'll create that async iterator
         and give you results using yield."
        ```
        
        Or even shorter:
        
        ```
        Promise        → one future value
        Async Iterator → many future values, one at a time
        Async Generator → convenient way to create an async iterator
        ```
        
        And remember the keywords:
        
        ```
        async  → asynchronous / Promise
        await  → wait for a Promise
        yield  → give a value + pause
        *      → generator
        ```
        
        So when you see:
        
        ```jsx
        async function* getData() {
          const data = await fetchData();
          yield data;
        }
        ```
        
        read it as:
        
        > **"Asynchronously get a value, give it to the consumer, pause, and potentially do the same thing again later."**
        > 
    - How do we handle errors in async code?
        
        ## **Error handling in async JavaScript**
        
        The main idea is simple:
        
        > **Promises represent failures as rejected Promises, and `try...catch` lets you handle those rejections when using `await`.**
        > 
        
        ### **1. `try...catch` with `async/await`**
        
        This is the most common approach:
        
        ```jsx
        async function getUser() {
          try {
            const response = await fetch("/api/user");
            const user = await response.json();
        
            return user;
          }catch (error) {
            console.log("Something went wrong:", error);
          }
        }
        ```
        
        If either **`fetch()`** or **`response.json()`** produces a rejected Promise, execution jumps to **`catch`**.
        
        Think:
        
        ```
        await Promise
              ↓
           succeeds → continue
              ↓
           fails → catch
        ```
        
        ---
        
        ### **2. An async function itself returns a rejected Promise**
        
        Remember that **`async`** functions always return Promises.
        
        So:
        
        ```jsx
        async function test() {
          throw new Error("Oops");
        }
        ```
        
        is effectively:
        
        ```
        test()
           ↓
        rejected Promise
        ```
        
        Therefore, you can handle it from outside:
        
        ```jsx
        try {
          await test();
        }catch (error) {
          console.log(error);
        }
        ```
        
        Or with **`.catch()`**:
        
        ```jsx
        test().catch(error=> {
          console.log(error);
        });
        ```
        
        So there are two common styles:
        
        ```jsx
        // async/await
        try {
          await doSomething();
        }catch (error) {
          // handle error
        }
        ```
        
        ```jsx
        // Promise style
        doSomething().catch(error=> {
          // handle error
        });
        ```
        
        ---
        
        ## **3. Errors with `Promise.all()`**
        
        Suppose you have:
        
        ```jsx
        try {
          const [user, posts]= await Promise.all([
            getUser(),
            getPosts()
          ]);
        }catch (error) {
          console.log("One of them failed:", error);
        }
        ```
        
        If **any** Promise rejects, **`Promise.all()`** rejects.
        
        ```
        getUser()  ──────── ✓
        getPosts() ──────── ✗
                            ↓
                      Promise.all()
                            ↓
                         rejected
                            ↓
                          catch
        ```
        
        This is useful when you need **all operations to succeed**.
        
        ---
        
        ## **4. What if you want every operation to finish?**
        
        Use **`Promise.allSettled()`**:
        
        ```jsx
        const results = await Promise.allSettled([
          getUser(),
          getPosts(),
          getComments()
        ]);
        ```
        
        You might get:
        
        ```jsx
        [
          { status: "fulfilled", value: user },
          { status: "rejected", reason: error },
          { status: "fulfilled", value: comments }
        ]
        ```
        
        So:
        
        ```
        Promise.all()
        → "Fail if any one fails."
        
        Promise.allSettled()
        → "Tell me what happened to every operation."
        ```
        
        ---
        
        ## **5. Don't forget synchronous errors**
        
        **`try...catch`** can handle both:
        
        ```jsx
        try {
          const data = await getData();
        
          JSON.parse(data);// could throw
        }catch (error) {
          // handles both async rejection and synchronous throw
        }
        ```
        
        That's one reason **`try...catch`** around **`await`** is so convenient.
        
        ---
        
        ## **6. Async generators**
        
        With an async generator:
        
        ```jsx
        async function* getData() {
          try {
            const data = await fetchData();
            yield data;
          }catch (error) {
            console.log("Failed:", error);
          }
        }
        ```
        
        The consumer can also handle errors:
        
        ```jsx
        try {
          for await (const item of getData()) {
            console.log(item);
          }
        }catch (error) {
          console.log("Something went wrong:", error);
        }
        ```
        
        ---
        
        ## **The mental model**
        
        Remember this:
        
        ```
        Promise fails
             ↓
        Promise becomes REJECTED
             ↓
        await sees the rejection
             ↓
        try/catch can catch it
        ```
        
        And for multiple operations:
        
        ```
        Promise.all()
             ↓
        any rejection → whole Promise.all rejects
        
        Promise.allSettled()
             ↓
        wait for everything → give you each result/error
        ```
        
        **In practice, `try/catch` + `async/await` is the default error-handling pattern you'll use most often.**
        
        Use `try/catch` with `async/await`, `.catch()` with Promises, error-first callbacks where applicable, and `'error'` events for event-based APIs. Always handle or propagate errors intentionally.
        
    - When does try/catch capture async errors and when does it not?
        
        It captures errors from an `await` expression inside the `try`. It does **not** automatically catch errors from unrelated asynchronous callbacks that execute later.
        
        ```jsx
        try {
          await operation(); // caught
        } catch (err) {}
        
        setTimeout(() => {
          throw new Error(); // NOT caught by the try above
        }, 0);
        ```
        
    - Which async abstraction supports the `captureRejections` flag, and what is it for?
        
        The **`captureRejections`** flag is a **Node.js `EventEmitter` feature**.
        
        It is used to automatically handle **rejected Promises returned by async event listeners**.
        
        For example:
        
        ```jsx
        const {EventEmitter }= require("events");
        
        const emitter = new EventEmitter({
          captureRejections: true
        });
        
        emitter.on("data", async ()=> {
          throw new Error("Oops");
        });
        
        emitter.on("error", error=> {
          console.log("Caught:", error.message);
        });
        ```
        
        Without **`captureRejections`**, the rejected Promise from the **`async`** listener isn't automatically turned into an **`'error'`** event.
        
        With:
        
        ```jsx
        captureRejections: true
        ```
        
        Node.js essentially does:
        
        ```
        async event listener
               ↓
        returns rejected Promise
               ↓
        captureRejections
               ↓
        'emitter' emits "error"
               ↓
        error listener handles it
        ```
        
        ### **Why is this useful?**
        
        Remember the **`try/catch`** rule you mentioned earlier:
        
        ```jsx
        try {
          emitter.emit("data");
        }catch (error) {
          // ❌ won't catch a later async rejection
        }
        ```
        
        **`EventEmitter`** callbacks are invoked independently, so a surrounding **`try/catch`** doesn't automatically catch their later Promise rejections.
        
        **`captureRejections`** gives **`EventEmitter`** a mechanism to **capture those rejected Promises and route them to the emitter's `'error'` handling**.
        
        ### **Easy memory trick**
        
        > **`captureRejections` → Node.js `EventEmitter` → catches rejected Promises from async listeners → routes them to `'error'`.**
        > 
        
        One important caveat: you should still have an **`'error'`** listener. In Node.js, an unhandled **`'error'`** event can cause the process to terminate.
        
        Node.js `EventEmitter`. `captureRejections` catches rejected Promises returned by event listeners and routes them to the emitter's error handling.
        
    - How can we avoid losing steps in the stack trace and improve debugging and understanding of control flow using async/await?
        
        The main idea is:
        
        > **Use `async/await` instead of deeply nested Promise callbacks because it makes asynchronous code look like normal sequential code and preserves the logical flow better.**
        > 
        
        ### **Harder to follow: nested callbacks**
        
        ```jsx
        getUser().then(user=> {
          getOrders(user.id).then(orders=> {
            processOrders(orders).then(result=> {
              console.log(result);
            });
          });
        });
        ```
        
        The control flow is buried inside callbacks, making it harder to understand where an error originated.
        
        ### **Easier to follow: `async/await`**
        
        ```jsx
        async function handleUser() {
          const user = await getUser();
          const orders = await getOrders(user.id);
          const result = await processOrders(orders);
        
          console.log(result);
        }
        ```
        
        Now the control flow is explicit:
        
        ```
        getUser
           ↓
        getOrders
           ↓
        processOrders
           ↓
        result
        ```
        
        And errors can be handled in one place:
        
        ```jsx
        async function handleUser() {
          try {
            const user = await getUser();
            const orders = await getOrders(user.id);
            const result = await processOrders(orders);
        
            return result;
          }catch (error) {
            console.error(error);
          }
        }
        ```
        
        ### **Why does this help stack traces?**
        
        When an error occurs after several asynchronous operations, modern JavaScript runtimes can maintain **async stack trace information**, so the stack can show the logical chain of asynchronous calls rather than making it feel like the execution suddenly jumped somewhere unrelated.
        
        For example:
        
        ```
        handleUser()
          ↓
        getUser()
          ↓
        getOrders()
          ↓
        processOrders()
          ↓
        ERROR
        ```
        
        This makes it easier to answer:
        
        > **"How did my code get here?"**
        > 
        
        ### **But one important clarification**
        
        **`async/await`** doesn't magically preserve **every** part of a stack trace. If you create unrelated asynchronous callbacks, detach work, or cross certain runtime boundaries, stack information can still become less complete.
        
        The practical rule is:
        
        > **Keep related asynchronous work in `async` functions, use `await` for the operations that form the control-flow chain, and handle errors with `try/catch` at meaningful boundaries.**
        > 
        
        That gives you code where the **syntax, control flow, and debugging path closely match the way you mentally understand the operation.**
        
        Use `async/await` instead of deeply nested callbacks, preserve original errors with `throw`, avoid unnecessarily wrapping errors, and use modern Node.js async stack traces and source maps.
        
    - How can we cancel async operations?
        
        In JavaScript, the standard way to **cancel an asynchronous operation** is to use an **`AbortController`**.
        
        The important idea is:
        
        > **You don't cancel a Promise itself. You signal to the operation that it should stop.**
        > 
        
        ### **Example with `fetch`**
        
        ```jsx
        const controller = new AbortController();
        
        fetch("/api/data", {
          signal: controller.signal
        });
        
        // Later...
        controller.abort();
        ```
        
        The flow is:
        
        ```
        AbortController
              ↓
           signal
              ↓
         async operation
              ↓
         controller.abort()
              ↓
         operation is aborted
        ```
        
        For **`fetch`**, aborting causes the Promise to reject:
        
        ```jsx
        const controller = new AbortController();
        
        try {
          const response = await fetch("/api/data", {
            signal: controller.signal
          });
        }catch (error) {
          if (error.name=== "AbortError") {
            console.log("Request was cancelled");
          }else {
            console.error(error);
          }
        }
        ```
        
        ### **Why `AbortController` is useful**
        
        You can pass the **same signal to multiple operations**:
        
        ```jsx
        const controller = new AbortController();
        
        fetch("/api/user", {
          signal: controller.signal
        });
        
        fetch("/api/posts", {
          signal: controller.signal
        });
        
        // Cancel both
        controller.abort();
        ```
        
        So you can think of it as:
        
        > **Controller = the thing that sends the cancellation signal.**
        > 
        > 
        > **Signal = the thing the async operation listens to.**
        > 
        
        ### **Important: not every async operation is automatically cancellable**
        
        This:
        
        ```jsx
        const promise = someAsyncFunction();
        
        controller.abort();
        ```
        
        doesn't magically cancel **`someAsyncFunction()`**.
        
        The operation itself must support cancellation, usually by accepting an **`AbortSignal`** or providing its own cancellation mechanism.
        
        For your own async functions, you can support **`AbortSignal`**:
        
        ```jsx
        async function doWork(signal) {
          if (signal.aborted) {
            throw new Error("Cancelled");
          }
        
          // do async work...
        }
        ```
        
        ### **What about `Promise.race()`?**
        
        You may see people use:
        
        ```jsx
        await Promise.race([
          operation(),
          timeout()
        ]);
        ```
        
        This can implement a **timeout**, but it does **not necessarily cancel the underlying operation**.
        
        For example:
        
        ```
        operation ──────────────────────────────
                      ↑
                   timeout
                      ↓
        Promise.race finishes ❌
        
        operation may STILL be running
        ```
        
        That's why **`AbortController`** is generally preferable when the underlying API supports it.
        
        ### **Memory trick**
        
        ```
        Promise
          → cannot directly be cancelled
        
        AbortController
          → sends cancellation signal
        
        AbortSignal
          → operation listens for that signal
        
        abort()
          → tells the operation "stop"
        ```
        
        **So: `AbortController` is the standard JavaScript mechanism for cooperative cancellation of supported async operations.**
        
        Use `AbortController`/`AbortSignal` where supported. APIs can listen for the signal and stop their work when `abort()` is called.
        
    - What is the difference between async contracts: callbacks, events, async/await, promises, etc.?
        
        The easiest way to understand **async contracts** is to think of them as different ways an API says:
        
        > **“I can't give you the result right now. Here's how you'll receive it later.”**
        > 
        
        The main difference is **how the caller receives the result, errors, and potentially multiple values**.
        
        ## **The main async contracts**
        
        | **Contract** | **Values** | **Errors** | **Typical use** |
        | --- | --- | --- | --- |
        | **Callback** | Usually one result | Callback parameter | Older APIs, Node-style APIs |
        | **Promise** | One eventual result | Rejection | One async operation |
        | **`async/await`** | One eventual result | **`try/catch`** | Cleaner Promise code |
        | **Event/EventEmitter** | Many values over time | Separate error event | Notifications, streams, events |
        | **Async iterator** | Many values over time | Rejected **`.next()`** Promise | Streams, paginated data |
        | **Async generator** | Many values over time | Rejections | Creating async iterators |
        
        ---
        
        # **1. Callback**
        
        A callback says:
        
        > **"When you're finished, call this function."**
        > 
        
        ```jsx
        getUser((error, user)=> {
          if (error) {
            console.error(error);
            return;
          }
        
          console.log(user);
        });
        ```
        
        The API controls when your callback gets called.
        
        The typical Node.js callback contract is:
        
        ```jsx
        callback(error, result)
        ```
        
        So:
        
        ```
        operation starts
              ↓
        operation finishes
              ↓
        callback(error, result)
        ```
        
        ### **Problem with callbacks**
        
        When operations depend on each other, callbacks can become deeply nested:
        
        ```jsx
        getUser((err, user)=> {
          getOrders(user.id, (err, orders)=> {
            processOrders(orders, (err, result)=> {
              // ...
            });
          });
        });
        ```
        
        This is one reason Promises became popular.
        
        ---
        
        # **2. Promise**
        
        A Promise says:
        
        > **"I'll give you ONE result later."**
        > 
        
        ```jsx
        const promise = getUser();
        ```
        
        You can consume it with:
        
        ```jsx
        promise
          .then(user=> {
            console.log(user);
          })
          .catch(error=> {
            console.error(error);
          });
        ```
        
        The important thing is that a Promise represents **one eventual outcome**:
        
        ```
                     Promise
                        ↓
                 ┌──────┴──────┐
                 ↓             ↓
             fulfilled      rejected
               value          error
        ```
        
        Unlike callbacks, the result and error are built into the Promise contract.
        
        ---
        
        # **3. `async/await`**
        
        **`async/await`** isn't a completely different asynchronous mechanism from Promises.
        
        It's essentially a **more readable way of consuming Promises**.
        
        ```jsx
        const user = await getUser();
        ```
        
        instead of:
        
        ```jsx
        getUser().then(user=> {
          // ...
        });
        ```
        
        Errors become easier to reason about:
        
        ```jsx
        try {
          const user = await getUser();
        }catch (error) {
          console.error(error);
        }
        ```
        
        So remember:
        
        > **Promise = the underlying async abstraction.**
        > 
        > 
        > **`async/await` = syntax for working with Promises more naturally.**
        > 
        
        And:
        
        ```jsx
        async function getData() {
          return "hello";
        }
        ```
        
        always returns a Promise.
        
        ---
        
        # **4. Events**
        
        Events are different.
        
        An event says:
        
        > **"I'll notify you whenever something happens."**
        > 
        
        For example:
        
        ```jsx
        emitter.on("message", message=> {
          console.log(message);
        });
        ```
        
        You can receive **many messages**:
        
        ```
        message
           ↓
        message
           ↓
        message
           ↓
        message
        ```
        
        Unlike a Promise, an event doesn't represent one eventual result.
        
        It's more like a subscription.
        
        ```
        Promise:
        
        operation → ONE result
        
        Event:
        
        event → result
        event → result
        event → result
        event → result
        ```
        
        ### **Typical uses**
        
        Events are good for things like:
        
        - WebSocket messages
        - user interactions
        - server events
        - streams
        - notifications
        - "something happened" signals
        
        ---
        
        # **5. Async iterator**
        
        An async iterator also represents **many values**, but the consumer **pulls** the values.
        
        ```jsx
        for await (const message of messages) {
          console.log(message);
        }
        ```
        
        Conceptually:
        
        ```
        Consumer
           ↓
        "Give me next value"
           ↓
        Async iterator
           ↓
        Promise
           ↓
        value
        ```
        
        Then the consumer asks again:
        
        ```
        "Give me next value"
                ↓
              value
                ↓
        "Give me next value"
                ↓
              value
        ```
        
        This is different from events.
        
        ### **Events = push**
        
        ```
        Producer
           ↓
           ↓ pushes events
           ↓
        Consumer
        ```
        
        ### **Async iterator = pull**
        
        ```
        Consumer
           ↓ asks for next
        Producer
           ↓
        value
        ```
        
        This distinction is extremely useful.
        
        ---
        
        # **6. Async generator**
        
        An async generator is a convenient way to **create an async iterator**.
        
        ```jsx
        async function* getPages() {
          yield await getPage(1);
          yield await getPage(2);
          yield await getPage(3);
        }
        ```
        
        Then:
        
        ```jsx
        for await (const page of getPages()) {
          console.log(page);
        }
        ```
        
        It combines:
        
        ```
        async → asynchronous operations
        await → wait for Promises
        yield → produce a value + pause
        * → generator
        ```
        
        So:
        
        > **Async generator = a convenient producer of asynchronous values, one at a time.**
        > 
        
        ---
        
        # **7. The most important distinction: one vs many**
        
        This is probably the best way to organize everything in your head.
        
        ```
                         HOW MANY RESULTS?
                               │
                    ┌──────────┴──────────┐
                    │                     │
                   ONE                  MANY
                    │                     │
                Promise              Events / Iterators
                    │                     │
              async/await          ┌──────┴──────┐
                                   │             │
                                 Events      Async iterator
                                   │             │
                                  push           pull
                                                 │
                                          Async generator
        ```
        
        ### **One result**
        
        Use a **Promise**:
        
        ```jsx
        const user = await getUser();
        ```
        
        ### **Many results pushed to you**
        
        Use **events**:
        
        ```jsx
        emitter.on("message", handler);
        ```
        
        ### **Many results that you consume one at a time**
        
        Use an **async iterator**:
        
        ```jsx
        for await (const message of messages) {
        }
        ```
        
        ### **Creating that async iterator**
        
        Use an **async generator**:
        
        ```jsx
        async function* messages() {
          // ...
        }
        ```
        
        ---
        
        # **8. Where does concurrency fit?**
        
        This is a separate concept.
        
        **Async contracts describe how you communicate asynchronous results.**
        
        **Concurrency describes how multiple operations can be in progress at the same time.**
        
        For example:
        
        ```jsx
        const [user, posts]= await Promise.all([
          getUser(),
          getPosts()
        ]);
        ```
        
        You're using:
        
        - **Promises** → async contract
        - **`await`** → consuming Promises
        - **`Promise.all`** → coordinating concurrent operations
        
        So don't confuse:
        
        ```
        Promise       → HOW do I get the result?
        Concurrency   → HOW can multiple operations overlap?
        Event loop    → HOW does JavaScript coordinate ready work?
        ```
        
        These are related, but they're different concepts.
        
        ---
        
        # **9. A practical decision guide**
        
        When designing or using an async API, ask:
        
        ### **"Will there be one result?"**
        
        Use:
        
        ```
        Promise / async-await
        ```
        
        Example:
        
        ```jsx
        const user = await getUser();
        ```
        
        ### **"Will there be many independent notifications?"**
        
        Use:
        
        ```
        Event / EventEmitter
        ```
        
        Example:
        
        ```jsx
        socket.on("message", handler);
        ```
        
        ### **"Will there be many values that I want to consume sequentially?"**
        
        Use:
        
        ```
        Async iterator
        ```
        
        Example:
        
        ```jsx
        for await (const chunk of stream) {
        }
        ```
        
        ### **"Am I building an async iterator?"**
        
        Use:
        
        ```
        Async generator
        ```
        
        Example:
        
        ```jsx
        async function* streamData() {
          // ...
        }
        ```
        
        ---
        
        # **The mental model to remember**
        
        If you want one compact cheat sheet:
        
        ```
        CALLBACK
        "Call this function when you're done."
        
        PROMISE
        "Give me ONE result later."
        
        ASYNC/AWAIT
        "Let me write Promise-based code
        in a sequential-looking way."
        
        EVENT
        "Tell me whenever something happens.
        There can be MANY events."
        
        ASYNC ITERATOR
        "I'll ask you for the NEXT value.
        It may take time."
        
        ASYNC GENERATOR
        "I'll produce those async values
        one at a time using yield."
        ```
        
        And the most useful distinction:
        
        > **Promise = one future result.**
        > 
        > 
        > **Event = many pushed notifications.**
        > 
        > **Async iterator = many values that the consumer pulls one at a time.**
        > 
        > **Async generator = a convenient way to build that async iterator.**
        > 
    
    ### 11–18: Promises, generators and workers
    
    - How are async contracts (callbacks, events, async/await, promises) related, and is it possible to eliminate older ones?
        1. Yes, they're related, but they solve slightly different problems. Think of them as **different interfaces for communicating asynchronous results**.
            
            ```
                             ASYNC WORK
                                 │
                    ┌────────────┼────────────┐
                    ↓            ↓            ↓
                Callback       Promise       Event
                    │            │            │
                 "call me"    "give me     "notify me
                              one result"   repeatedly"
                                 │
                                 ↓
                            async/await
                          (syntax over
                            Promises)
            ```
            
            ## **How they're related**
            
            ### **1. Callbacks**
            
            The oldest/common pattern:
            
            ```jsx
            doSomething((error, result)=> {
              // handle result
            });
            ```
            
            The contract is:
            
            > **"When you're finished, call this function."**
            > 
            
            Callbacks can represent one result, repeated notifications, errors, etc., depending on the API.
            
            ---
            
            ### **2. Promises**
            
            Promises provide a more structured contract for **one eventual result**:
            
            ```jsx
            doSomething()
              .then(result=> {
                // success
              })
              .catch(error=> {
                // failure
              });
            ```
            
            You can think of a Promise as turning:
            
            ```
            "Call this function later"
            ```
            
            into:
            
            ```
            "Here's an object representing the future result."
            ```
            
            This makes composition much easier:
            
            ```jsx
            const user = await getUser();
            const orders = await getOrders(user.id);
            ```
            
            ---
            
            ### **3. `async/await`**
            
            **`async/await`** isn't a replacement for Promises underneath.
            
            It's primarily **syntax for working with Promises**.
            
            ```jsx
            const user = await getUser();
            ```
            
            is built around the fact that **`getUser()`** returns a Promise.
            
            So:
            
            ```
            Promise
              ↓
            provides the asynchronous result
              ↓
            async/await
              ↓
            provides a convenient way to consume it
            ```
            
            And an **`async`** function itself returns a Promise.
            
            ---
            
            ### **4. Events**
            
            Events are different because they are generally for **multiple occurrences over time**:
            
            ```jsx
            socket.on("message", message=> {
              console.log(message);
            });
            ```
            
            The contract is:
            
            > **"Tell me whenever this happens."**
            > 
            
            You could receive:
            
            ```
            message
            message
            message
            message
            ...
            ```
            
            A Promise isn't a natural replacement for this because a Promise normally settles **once**.
            
            ---
            
            # **Can we eliminate the older abstractions?**
            
            **Not completely.**
            
            You can replace some callback-based APIs with Promises, and you can use **`async/await`** instead of **`.then()`** in many cases.
            
            For example:
            
            ```jsx
            // Callback
            getUser((error, user)=> {
              // ...
            });
            ```
            
            can often become:
            
            ```jsx
            // Promise
            const user = await getUser();
            ```
            
            But you can't simply eliminate **events**, because they represent a different communication pattern.
            
            For example, a WebSocket might produce hundreds of messages:
            
            ```
            server
              ↓
            message
              ↓
            message
              ↓
            message
              ↓
            message
            ```
            
            You need some abstraction capable of representing **multiple values over time**.
            
            ---
            
            # **What about converting everything to Promises?**
            
            You *can* wrap many callback APIs in Promises:
            
            ```jsx
            function getUserAsync() {
              return new Promise((resolve, reject)=> {
                getUser((error, user)=> {
                  if (error)reject(error);
                  else resolve(user);
                });
              });
            }
            ```
            
            Then:
            
            ```jsx
            const user = await getUserAsync();
            ```
            
            This is useful because you've adapted an old callback API to a Promise-based API.
            
            But notice what happened:
            
            ```
            Old API
            callback
               ↓
            adapter
               ↓
            Promise
               ↓
            async/await
            ```
            
            The callback hasn't disappeared from the system—it has simply been **hidden behind the Promise interface**.
            
            ---
            
            # **Why can't everything be a Promise?**
            
            Because different problems need different contracts.
            
            ### **One result**
            
            ```
            Promise
            "I'll give you one result."
            ```
            
            ### **Many notifications**
            
            ```
            Event
            "I'll tell you whenever something happens."
            ```
            
            ### **Many asynchronously-produced values**
            
            ```
            Async iterator
            "Ask me for the next value when you're ready."
            ```
            
            These aren't just different syntax—they have different **semantics**.
            
            ---
            
            # **The evolution to remember**
            
            A useful historical mental model is:
            
            ```
            Callbacks
                ↓
            Promises
                ↓
            async/await
            ```
            
            But **events exist alongside them**, because events solve a different problem.
            
            And modern JavaScript can also use:
            
            ```
            Async iterators / async generators
            ```
            
            when you have a sequence of asynchronous values.
            
            So don't think:
            
            > "Callbacks are old, Promises are new, therefore Promises replace everything."
            > 
            
            Instead think:
            
            > **Different async contracts describe different ways that asynchronous information flows.**
            > 
            
            The most useful mental model is:
            
            ```
            ONE RESULT
                ↓
            Promise
                ↓
            async/await
            
            MANY PUSHED NOTIFICATIONS
                ↓
            Events
            
            MANY VALUES, CONSUMER PULLS THEM
                ↓
            Async Iterator
                ↓
            Async Generator creates it
            ```
            
            **You can modernize old callback APIs with Promise wrappers, but you shouldn't eliminate an abstraction just because it's older. Choose the contract that matches how the data actually flows.**
            
        
        They solve related but different problems. Promises can wrap callbacks, `async/await` uses Promises, and events can be converted to Promises/async iterators. Older APIs cannot always be eliminated because events, streams, and callbacks can represent patterns that Promises cannot.
        
    - What is the difference between `Promise.all()` and `Promise.allSettled()`?
        
        `Promise.all()` fulfills only when **all** fulfill and rejects as soon as one rejects. `allSettled()` waits for **all** and returns each result's status.
        
    - What is the difference between `f2` and `f3` in the following expression: `promiseInstance.then(f1, f2).catch(f3)`?
        
        `f2` handles rejection of the **original Promise**. `f3` handles rejections from the entire preceding chain, including errors thrown by `f1` or `f2`.
        
    - When and why might we have multiple catch clauses: `promiseInstance.catch(f1).catch(f2).catch(f3)`?
        
        Each `catch` handles errors from everything before it. Multiple catches are useful when recovering from one failure can itself fail and you want different recovery/fallback levels.
        
        Multiple **`.catch()`** clauses are useful when you want to **handle or recover from errors at different stages** of a Promise chain.
        
        ```jsx
        promise
          .catch(f1)
          .catch(f2)
          .catch(f3);
        ```
        
        ### **How it works**
        
        Each **`.catch()`** receives a **rejected Promise from the previous step**.
        
        - **`f1`** handles the original rejection.
        - If **`f1`** **succeeds/returns normally**, the chain becomes fulfilled → **`f2`** and **`f3`** are skipped.
        - If **`f1`** **throws or returns a rejected Promise**, **`f2`** handles that new error.
        - Same idea for **`f3`**.
        
        Example:
        
        ```jsx
        getData()
          .catch(()=> getBackupData())// recover
          .catch(()=> showError());// backup also failed
        ```
        
        Flow:
        
        ```
        getData()
           ↓ fails
        catch(f1)
           ↓
        backup succeeds → done
        
        backup fails
           ↓
        catch(f2)
        ```
        
        **Memory rule:**
        
        > A **`.catch()`** handles a rejection and creates a new Promise. The next **`.catch()`** only runs if that new Promise is rejected.
        > 
    - Why do we have `Promise` method `finally`, and what are its use cases?
        
        **`finally()`** is used for **cleanup that should happen whether a Promise succeeds or fails**.
        
        ```jsx
        doSomething()
          .then(result=> ...)
          .catch(error=> ...)
          .finally(()=> {
            // always runs
          });
        ```
        
        ### **Why?**
        
        Without **`finally()`**, you'd repeat cleanup:
        
        ```jsx
        try {
          await operation();
        }catch (error) {
          // handle error
        }finally {
          cleanup();
        }
        ```
        
        Common use cases:
        
        - Stop a loading spinner.
        - Close a connection/file.
        - Release a resource.
        - Reset UI state.
        - Hide a progress indicator.
        
        ### **Important detail**
        
        **`finally()`** doesn't receive the result or error:
        
        ```jsx
        promise
          .finally(()=> {
            // no result/error here
          });
        ```
        
        It's about **cleanup**, not handling the error.
        
        **Memory rule:**
        
        > **`then` → success, `catch` → failure, `finally` → regardless of outcome.**
        > 
        
        CONCLUSION:`finally()` executes regardless of fulfillment or rejection. It's useful for cleanup such as closing resources, hiding loading indicators, releasing locks, or resetting state.
        
    - How can we write async code with sync generators? What are the advantages and disadvantages of this approach?
        
        Before **`async function*`** existed, **sync generators could still be used to control async code**, but you needed a **runner** that interprets the yielded Promises.
        
        ### **Example**
        
        ```jsx
        function* task() {
          const user = yield getUser();
          const posts = yield getPosts(user.id);
        
          return posts;
        }
        ```
        
        **`task()`** itself is synchronous, but it **yields Promises**.
        
        A runner can execute it:
        
        ```jsx
        function run(generator) {
          const iterator = generator();
        
          function step(value) {
            const { value:result, done }= iterator.next(value);
        
            if (done)return Promise.resolve(result);
        
            return Promise.resolve(result).then(step);
          }
        
          return step();
        }
        
        run(task).then(posts=> {
          console.log(posts);
        });
        ```
        
        The flow is:
        
        ```
        generator
           ↓
        yield Promise
           ↓
        runner waits
           ↓
        resume generator with result
           ↓
        yield next Promise
           ↓
        runner waits
           ↓
        ...
        ```
        
        ### **Why was this useful?**
        
        **Advantages:**
        
        - Made async code look sequential.
        - Avoided deeply nested callbacks.
        - Let you write **`yield`** where you wanted to wait.
        - Provided a foundation for libraries like **`co`** before **`async/await`**.
        
        **Disadvantages:**
        
        - Required a special **runner**.
        - More complicated than modern **`async/await`**.
        - **`yield`** doesn't inherently mean "wait for a Promise"—the runner has to implement that behavior.
        - Error handling and debugging are more complicated.
        - Modern JavaScript has a much cleaner solution: **`async/await`**.
        
        ### **Memory rule**
        
        > **Sync generator + yielded Promises + runner = old-style async control flow.**
        > 
        
        Modern equivalent:
        
        ```jsx
        async function task() {
          const user = await getUser();
          const posts = await getPosts(user.id);
          return posts;
        }
        ```
        
        So **`async/await`** essentially gives you the **"generator + Promise runner" idea as a built-in language feature**, with much less boilerplate.
        
    - Provide examples of using `yield` in async programming. How to rewrite it in modern JavaScript?
        
        The key is that **older generator-based async code used `yield` to hand a Promise to a runner**, while modern JavaScript uses **`await`** directly.
        
        ### **1. Basic example**
        
        **Older:**
        
        ```jsx
        function* task() {
          const user = yield getUser();
          return yield getPosts(user.id);
        }
        ```
        
        A special **runner** waits for each yielded Promise and resumes the generator with its result.
        
        **Modern:**
        
        ```jsx
        async function task() {
          const user = await getUser();
          return await getPosts(user.id);
        }
        ```
        
        ### **2. Multiple async operations**
        
        **Older:**
        
        ```jsx
        function* task() {
          const user = yield getUser();
          const orders = yield getOrders(user.id);
          const result = yield processOrders(orders);
        
          return result;
        }
        ```
        
        **Modern:**
        
        ```jsx
        async function task() {
          const user = await getUser();
          const orders = await getOrders(user.id);
          const result = await processOrders(orders);
        
          return result;
        }
        ```
        
        ### **3. Error handling**
        
        With generators, the runner had to handle errors and throw them back into the generator.
        
        Modern JavaScript is much simpler:
        
        ```jsx
        async function task() {
          try {
            const user = await getUser();
            return await getPosts(user.id);
          }catch (error) {
            console.error(error);
          }
        }
        ```
        
        ### **The important distinction**
        
        ```
        Old:
        yield Promise
             ↓
        runner waits
             ↓
        runner resumes generator
        
        Modern:
        await Promise
             ↓
        JavaScript handles the waiting
             ↓
        function resumes
        ```
        
        **Memory rule:**
        
        > **`yield`** in old async generators + a Promise runner ≈ **`await`** in modern **`async`** functions.
        > 
        
        Also, **`yield`** itself **doesn't mean "wait for a Promise"**. The runner gave it that meaning. **`await`** has asynchronous Promise-handling semantics built into JavaScript.
        
    
    ### 18–20: Workers and Event Loop
    
    - Describe the differences between Web Workers, Shared Workers, and Worker Threads.
        
        All three let you move work **off the main JavaScript thread**, but they belong to different environments and have different communication models.
        
        |  | **Web Worker** | **Shared Worker** | **Worker Thread** |
        | --- | --- | --- | --- |
        | Environment | Browser | Browser | Node.js |
        | Can share between pages? | ❌ | ✅ | ❌ usually |
        | Separate thread? | ✅ | ✅ | ✅ |
        | Communication | **`postMessage()`** | **`postMessage()`** | **`postMessage()`** |
        | Can access DOM? | ❌ | ❌ | N/A |
        | Main purpose | CPU-heavy browser work | Share one worker across tabs/windows | CPU-heavy Node.js work |
        
        ### **Web Worker**
        
        A **Web Worker** runs JavaScript in a separate browser thread:
        
        ```
        Main thread
            │
            │ postMessage()
            ↓
        Web Worker
            │
            │ postMessage()
            ↓
        Main thread
        ```
        
        Useful for CPU-heavy work so the UI doesn't freeze.
        
        ---
        
        ### **Shared Worker**
        
        A **Shared Worker** is similar, but **multiple browser contexts can connect to the same worker**.
        
        ```
        Tab A ──┐
        Tab B ──┼──→ Shared Worker
        Tab C ──┘
        ```
        
        Useful when multiple tabs/windows need to share one background worker.
        
        ---
        
        ### **Worker Thread**
        
        A **Worker Thread** is Node.js's equivalent for running JavaScript on another thread.
        
        ```
        Node main thread
               │
               ↓
        Worker Thread
               │
               ↓
        CPU-heavy work
        ```
        
        Useful for CPU-intensive operations that would otherwise block Node's event loop.
        
        ### **Memory trick**
        
        > **Web Worker → one browser context**
        > 
        > 
        > **Shared Worker → multiple browser contexts**
        > 
        > **Worker Thread → Node.js**
        > 
        
        And the key reason for all of them:
        
        > **Move CPU-heavy work away from the main/event-loop thread so it doesn't block responsiveness.**
        > 
        
        **CONCLUSION: Difference between Web Workers, Shared Workers, and Worker Threads?**
        
        - **Web Worker:** browser background thread for one page/context.
        - **Shared Worker:** browser worker that can be shared by multiple browsing contexts.
        - **Worker Thread:** Node.js thread for running JavaScript outside the main event-loop thread.
    - Describe microtasks and macrotasks and their relation to the event loop.
        
        The **event loop** decides what JavaScript runs next.
        
        ### **Macrotasks (tasks)**
        
        Examples:
        
        ```jsx
        setTimeout(...)
        setInterval(...)
        I/O callbacks
        events
        ```
        
        They represent larger pieces of work scheduled for the event loop.
        
        ### **Microtasks**
        
        Examples:
        
        ```jsx
        Promise.then(...)
        Promise.catch(...)
        Promise.finally(...)
        queueMicrotask(...)
        ```
        
        They are higher-priority follow-up work.
        
        ### **How they interact**
        
        The simplified order is:
        
        ```
        Macrotask
           ↓
        run synchronous code
           ↓
        drain ALL microtasks
           ↓
        next macrotask
           ↓
        drain ALL microtasks
           ↓
        ...
        ```
        
        Example:
        
        ```jsx
        setTimeout(()=> console.log("timer"));
        
        Promise.resolve().then(()=> console.log("promise"));
        
        console.log("sync");
        ```
        
        Output:
        
        ```
        sync
        promise
        timer
        ```
        
        Why?
        
        ```
        sync code
           ↓
        microtask: Promise
           ↓
        macrotask: timer
        ```
        
        ### **Memory rule**
        
        > **Tasks do the main work; microtasks are cleared immediately after the current task, before the next task.**
        > 
        
        One important consequence: **too many continuously-created microtasks can delay timers, I/O, and other tasks**, because the runtime keeps draining the microtask queue before moving on.
        
    - What are Worker Threads in Node.js, and how might we use this technique?
        
        **Worker Threads** let Node.js run JavaScript in a **separate thread**, so CPU-heavy work doesn't block the main event loop.
        
        ```
        Main thread
          │
          ├── handles requests / I/O
          │
          └── sends heavy work
                  ↓
             Worker Thread
                  ↓
             CPU calculation
                  ↓
             result → Main thread
        ```
        
        ### **Example**
        
        **Main file:**
        
        ```jsx
        const {Worker} = require("node:worker_threads");
        
        const worker = new Worker("./worker.js");
        
        worker.postMessage(10);
        
        worker.on("message", result=> {
          console.log(result);
        });
        ```
        
        **worker.js:**
        
        ```jsx
        const {parentPort }= require("node:worker_threads");
        
        parentPort.on("message", n=> {
          const result = expensiveCalculation(n);
          parentPort.postMessage(result);
        });
        ```
        
        The main thread remains free while the worker performs the expensive calculation.
        
        ### **When to use them**
        
        Good for **CPU-bound work**, such as:
        
        - Large calculations
        - Image/video processing
        - Encryption/hashing
        - Parsing large datasets
        - Complex algorithms
        
        They're generally **not needed just because something is asynchronous**. Network/database/file I/O can usually use Node's existing asynchronous APIs without creating a worker.
        
        ### **Memory rule**
        
        > **Async I/O → let Node handle it asynchronously.**
        > 
        > 
        > **Heavy CPU work → consider a Worker Thread.**
        > 
        
        The goal is to prevent:
        
        ```
        CPU-heavy synchronous work
                ↓
        main thread blocked
                ↓
        event loop can't process other work
        ```
        
        by moving it to:
        
        ```
        Worker Thread
              ↓
        heavy CPU work
        ```
        
        One important detail: Worker Threads have their **own JavaScript execution context and event loop**. They communicate with the main thread primarily through message passing rather than sharing ordinary JavaScript variables.
        
    
    ### 21–30: Performance and async context
    
    - How can we measure I/O operations performance and resource usage?
    - What are `process.hrtime` and `process.hrtime.bigint()`, and what is the difference?
    - Tell us about the following Node.js API: `const { performance } = require('node:perf_hooks');`
    - How can we efficiently handle asynchronous API requests at the client side that return large amounts of data?
    - How can we efficiently handle API requests at the server side that return large amounts of data asynchronously?
    - How can we ensure state isolation between different asynchronous requests in a single Node.js process?
    - What is CLS (continuation local storage), and do we have a modern substitution for this async technique in Node.js?
    - Which event loop phases are related to pending callbacks?
    - Tell us about `Thenable` contract and its relation to `Promise`.
    - How can we associate some state (collection or data structure) with the chain of async calls?
    
    ### 31–40: Request tracking and concurrency
    
    - How can we track the chain of async calls from external requests (originating from API call via HTTP, UDP, IPC, WebSocket)?
    - How can we ensure safe processing of competing requests to a resource?
    - Why do we need locks API, such as Web Locks?
    - How can we use parallel programming primitives (semaphore, mutex, critical section, etc.) in async programming?
    - Tell us about «Reactive programming» paradigm.
    - What is the difference between streams and signals approaches in reactive programming?
    - How can we handle and avoid deadlocks in asynchronous code?
    - How can we ensure high availability in asynchronous applications?
    - How can we handle asynchronous operations that depend on each other (parallel and sequential executions)?
    - What is a race condition, and how can we avoid it?
    
    ### 41–50: Promise utilities, throttling and timers
    
    - Provide use cases for `Promise.race`, `Promise.all`, and `Promise.allSettled`.
    - What are throttling and debouncing in the context of asynchronous programming?
    - How can we shape async calls (e.g., to limit request flow to an API)?
    - What abstractions implementing the `Observable` pattern do we have in JavaScript for backend and frontend?
    - Describe the `Signals` approach for reactive code.
    - Why are `Streams` useful to improve code semantics as a high-level abstraction?
    - What is back pressure?
    - What is the difference between creating a `Stream` with `extends` vs. passing `read`, `write`, or `transform` function to a revealing constructor?
    - Why do we have three sets of timers: in the global context (e.g., `setTimeout`), `node:timers`, and `node:timers.promises`?
    - What promisified APIs do you know, and how can we manually promisify other APIs?
    
    ### 51–60: Testing, TypeScript and await
    
    - Tell us about testing of asyncronous code.
    - Why can't TypeScript describe async contracts in all aspects?
    - How can we prevent memory leaks in async code?
    - What are the best practices for managing concurrency in JavaScript?
    - How can we use async/await with `EventEmitter`?
    - What is the difference between `EventEmitter` and `EventTarget`?
    - What is the role of the `await` keyword in async functions?
    - What happens if we use `await` with non-promise values (or expressions)?
    - How can we add timeouts in async operations (including `await` syntax)?
    - What are the implications of the `process.nextTick` method?
    
    ### 61–70: Async iterables, legacy systems and performance
    
    - How can we create custom async iterables and what are their use cases?
    - What are the advantages and disadvantages of using third-party async libraries like `Promise` polyfills and `async.js`?
    - How can we handle async code in legacy systems?
    - What is the difference between asynchronous, parallel, and I/O operations?
    - How can we parallelize I/O operations effectively?
    - How can we ensure thread safety in async programming?
    - How are `Atomics` related to asynchronous and parallel programming? What are they used for?
    - How can we optimize async code for performance?
    - How can we handle retries (calls, calculations, resource access) in async programming?
    - What are the common pitfalls of async programming?
    
    ### 71–80: Arrays, debugging, cancellation and chaining
    
    - How can we use async functions with `Array.prototype.map`?
    - How can we debug async code effectively?
    - How can we ensure data consistency in async operations?
    - What are the benefits of using `async/await` over callbacks?
    - Which operations can't be rewritten from callbacks to `async/await` syntax (but are possible with `Promises`)?
    - Propose use cases for `AbortSignal.timeout()`. Which well-known APIs support it?
    - Where and for what purposes can we use `AbortSignal.any(iterable)`?
    - What are the differences between `Promise` methods: `resolve` and `reject`?
    - How can we handle errors in `Promise.all`?
    - How can we chain async operations? (Please propose cases for as many contracts as you know)
    
    ### 81–90: Event loop, long operations and state
    
    - What is the role of the event loop in async programming?
    - How can we handle long-running async operations? (Processes may exit, results may become obsolete, etc.)
    - How can we ensure idempotency in async operations and when do we need it?
    - Can we write a real-time application in JavaScript and asynchronous programming?
    - How can we ensure the order of async operations? Please suggest cases in which we might experience problems.
    - How can we handle async code in a high-availability system?
    - What are observables and how can we use them in JavaScript?
    - What are the main problems of handling state in asynchronous code in a stateful application?
    - When can we use internal async queues and when do we need external queue systems?
    - How can we use async functions with caching, memoization, and recalculations on state updates?
    
    ### 91–100: Databases, architecture, security and advanced async
    
    - How can we use async functions with database connections and what are the use cases?
    - How can we separate async code from business logic and why might we want to do this?
    - What is the impact of async code on CPU-bound vs I/O-bound operations?
    - What are the security considerations in async programming?
    - How can we implement a priority queue for async tasks?
    - How can we use async functions with file system operations?
    - How can we ensure atomicity in async operations and what for?
    - What are the trade-offs between using `Promise` and `async/await`?
    - What is the difference between simple async programming and the RxJS approach?
    - What are async collections and how can they improve developer experience?
- Practical Questions
    - What is the order of execution in the snippet below?
        
        ```jsx
        console.log('1');
        
        setTimeout(() => console.log('2'), 0);
        
        Promise.resolve().then(() => console.log('3'));
        
        console.log('4');
        
        ```
        
        **Answer:**  Output: `1`, `4`, `3`, `2`
        
        **Why:** Synchronous logs (`1` and `4`) run first. `setTimeout` goes to the macrotask queue, while `Promise.then` goes to the microtask queue. Microtasks have higher priority and execute before the next macrotask. [1), 2]
        
    - Write a function that takes a Node.js-style callback function `(err, result) => {}` and returns a function returning a `Promise`.
        
        ```jsx
        function promisify(fn) {
          return function(...args) {
            return new Promise((resolve, reject) => {
              fn(...args, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              });
            });
          };
        }
        
        ```
        
    - How would you recreate `Promise.all` manually?
        
        ```jsx
        function promiseAll(promises) {
          return new Promise((resolve, reject) => {
            let results = [];
            let completed = 0;
            
            if (promises.length === 0) {
              resolve(results);
              return;
            }
        
            promises.forEach((p, index) => {
              Promise.resolve(p)
                .then(res => {
                  results[index] = res;
                  completed++;
                  if (completed === promises.length) {
                    resolve(results);
                  }
                })
                .catch(reject);
            });
          });
        }
        ```
        
- Mental Model Question
    - 19.08.2026
        - What are Thenables, and what is their relationship with Promises?
            
            First, understand what a **Promise** is.
            
            A Promise is a JavaScript object that represents a value that **will be available later**.
            
            For example:
            
            ```jsx
            const promise = fetch("/users");
            ```
            
            The server might not respond immediately. Instead of stopping the entire program and waiting, JavaScript gives us a Promise.
            
            The Promise can eventually:
            
            - **Fulfill** → the operation succeeded.
            - **Reject** → the operation failed.
            
            A **thenable** is simply **any object that has a `.then()` method**.
            
            ```jsx
            const thenable = {
              then() {
                console.log("Hello");
              }
            };
            ```
            
            This is a thenable because it has a `.then()` method.
            
            A real Promise also has `.then()`:
            
            ```jsx
            const promise = Promise.resolve(10);
            
            promise.then(value => {
              console.log(value);
            });
            ```
            
            Therefore:
            
            > **Every Promise is a thenable, but not every thenable is a Promise.**
            > 
            
            Why does this matter?
            
            JavaScript is designed to recognize objects that behave like Promises. If an object has a usable `.then()` method, JavaScript can treat it like a Promise in many situations.
            
            For example:
            
            ```jsx
            Promise.resolve(thenable);
            ```
            
            JavaScript will adopt the behavior of that thenable.
            
            ### Easy memory
            
            > **Thenable = anything with `.then()`**
            > 
            > 
            > **Promise = JavaScript's actual Promise object**
            > 
        - What are async generators and iterators?
            
            To understand this, first understand an **iterator**.
            
            An iterator is an object that allows you to get values **one at a time**.
            
            For example:
            
            ```jsx
            const numbers = [10, 20, 30];
            
            for (const number of numbers) {
              console.log(number);
            }
            ```
            
            The array is iterable, meaning JavaScript can get its values one by one.
            
            An **async iterator** does the same thing, except the values may arrive **asynchronously**.
            
            Imagine downloading a large file.
            
            You don't necessarily receive the entire file at once:
            
            ```
            Chunk 1 → arrives
            Chunk 2 → arrives
            Chunk 3 → arrives
            Chunk 4 → arrives
            ```
            
            An async iterator allows JavaScript to process these values as they become available.
            
            ---
            
            ## Async generator
            
            An async generator is a special function that produces asynchronous values one at a time.
            
            It uses:
            
            ```jsx
            async function*
            ```
            
            and `yield`.
            
            Example:
            
            ```jsx
            async function* numbers() {
              yield 1;
              yield 2;
              yield 3;
            }
            ```
            
            We can consume it with:
            
            ```jsx
            for await (const number of numbers()) {
              console.log(number);
            }
            ```
            
            The output is:
            
            ```
            1
            2
            3
            ```
            
            The important difference is that the generator can **pause**, produce a value, and later continue producing another value.
            
            ---
            
            ## Why are async generators useful?
            
            They are useful when data arrives gradually.
            
            Examples:
            
            - Reading files.
            - Processing network streams.
            - Receiving messages.
            - Reading database results.
            - Processing large amounts of data.
            - Consuming paginated APIs.
            
            Instead of loading everything into memory:
            
            ```
            Get everything
            ↓
            Store everything
            ↓
            Process everything
            ```
            
            you can do:
            
            ```
            Get one
            ↓
            Process it
            ↓
            Get next
            ↓
            Process it
            ↓
            Get next
            ```
            
            This can be much more memory-efficient.
            
        - What is `for await...of`?
            
            `for await...of` is a loop designed to consume **asynchronous iterables**.
            
            For example:
            
            ```jsx
            for await (const value of asyncIterable) {
              console.log(value);
            }
            ```
            
            The important word is **`await`**.
            
            It means:
            
            > "Wait for the next value before continuing."
            > 
            
            Imagine:
            
            ```
            Value 1 takes 1 second
            Value 2 takes 2 seconds
            Value 3 takes 1 second
            ```
            
            The loop waits for each value:
            
            ```
            Wait → Value 1
            Wait → Value 2
            Wait → Value 3
            ```
            
            It doesn't move forward until the next value is available.
            
            ### Easy memory
            
            > `for...of` → values are immediately available.
            > 
            > 
            > `for await...of` → values may need to be awaited.
            > 
        - When does `try/catch` capture async errors?
            
            `try/catch` is used to handle errors.
            
            For synchronous code:
            
            ```jsx
            try {
              throw new Error("Something went wrong");
            } catch (error) {
              console.log("Error caught");
            }
            ```
            
            The error happens inside the `try`, so `catch` catches it.
            
            With asynchronous code, there is an important rule:
            
            > **`try/catch` catches a Promise rejection when you `await` that Promise inside the `try`.**
            > 
            
            Example:
            
            ```jsx
            try {
              const result = await fetchData();
            } catch (error) {
              console.log("Something went wrong");
            }
            ```
            
            If `fetchData()` rejects, `await` turns that rejection into an error that `catch` can catch.
            
            ---
            
            ## What if we don't use `await`?
            
            Consider:
            
            ```jsx
            try {
              fetchData();
            } catch (error) {
              console.log("Caught!");
            }
            ```
            
            This does **not necessarily catch the Promise rejection**.
            
            Why?
            
            Because `fetchData()` immediately returns a Promise.
            
            The actual failure happens **later**, after the `try` block has already finished.
            
            Think of it like:
            
            ```
            try starts
               ↓
            start asynchronous operation
               ↓
            try ends
               ↓
            later...
               ↓
            Promise rejects
            ```
            
            The `catch` is no longer waiting.
            
            ### Easy memory
            
            > **`await` inside `try` → rejection can be caught.**
            > 
            > 
            > **Just calling the Promise → `try/catch` doesn't catch its later rejection.**
            > 
        - What is the difference between `f2` and `f3` in the following expression: `promiseInstance.then(f1, f2).catch(f3)`?
            
            Consider:
            
            ```jsx
            promiseInstance
              .then(f1, f2)
              .catch(f3);
            ```
            
            This is easier to understand if we think about the two possible outcomes of the original Promise.
            
            Suppose:
            
            ```jsx
            promiseInstance
            ```
            
            succeeds.
            
            Then:
            
            ```
            f1
            ```
            
            runs.
            
            If the original Promise fails, then:
            
            ```
            f2
            ```
            
            runs.
            
            So:
            
            ```jsx
            .then(f1, f2)
            ```
            
            means:
            
            ```
            Success → f1
            Failure → f2
            ```
            
            But there's something important about `f2`.
            
            `f2` only handles rejection from the **original Promise**.
            
            Now suppose `f1` itself throws an error:
            
            ```jsx
            .then(() => {
              throw new Error("f1 failed");
            }, f2)
            ```
            
            `f2` will **not** handle that error.
            
            Why?
            
            Because `f2` belongs to the previous Promise's rejection.
            
            The error happened **inside `f1`**.
            
            That's where:
            
            ```
            .catch(f3)
            ```
            
            becomes useful.
            
            `f3` can catch errors/rejections that happen in the chain before it.
            
            So:
            
            ```
            Original Promise
                  ↓
               success
                  ↓
                 f1
                  ↓
               if f1 fails
                  ↓
                 f3
            ```
            
            ### Easy memory
            
            > **f2 = handles failure of the original Promise.**
            > 
            > 
            > **f3 = handles failures that reach the catch, including errors from f1.**
            > 
        - When and why might we have multiple catch clauses: `promiseInstance.catch(f1).catch(f2).catch(f3)`?
            
            Consider:
            
            ```jsx
            promiseInstance
              .catch(f1)
              .catch(f2)
              .catch(f3);
            ```
            
            At first this might look strange.
            
            Why not just:
            
            ```
            promiseInstance.catch(f1);
            ```
            
            The reason is that **a catch handler can itself fail**.
            
            For example:
            
            ```jsx
            promiseInstance
              .catch(error => {
                console.log("First error");
                throw new Error("Something else went wrong");
              })
              .catch(error => {
                console.log("Second error");
              });
            ```
            
            The first `catch` receives the original error.
            
            But then it throws another error.
            
            That new error travels to the next `catch`.
            
            So you can think of the chain as:
            
            ```
            Promise
              ↓
            Error
              ↓
            catch #1 handles it
              ↓
            catch #1 creates another error
              ↓
            catch #2 handles that
            ```
            
            Another use is **different levels of recovery**.
            
            For example:
            
            ```
            promise
              .catch(handleNetworkError)
              .catch(handleUnexpectedError)
              .catch(handleFinalError);
            ```
            
            Each stage can provide another layer of error handling.
            
            ### Easy memory
            
            > **Multiple catches create multiple levels of error handling.**
            > 
        - What is the difference between parallelism and concurrency in JavaScript?
            
            These two words are often confused.
            
            ## Concurrency
            
            Concurrency means:
            
            > **Multiple tasks are being managed/in progress during the same period.**
            > 
            
            They don't necessarily execute at exactly the same instant.
            
            Imagine one chef preparing three meals.
            
            The chef might:
            
            ```
            Start meal A
            ↓
            while A is cooking
            ↓
            prepare meal B
            ↓
            while B is cooking
            ↓
            prepare meal C
            ```
            
            Several things are progressing, but the chef isn't literally cooking all three with their hands at the exact same time.
            
            That's similar to JavaScript's event-driven model.
            
            ---
            
            ## Parallelism
            
            Parallelism means:
            
            > **Multiple tasks are actually executing at the same time.**
            > 
            
            Imagine three chefs:
            
            ```
            Chef A → meal A
            Chef B → meal B
            Chef C → meal C
            ```
            
            They can literally work simultaneously.
            
            In computing, parallelism is usually achieved using **multiple CPU cores or workers**.
            
            ---
            
            ### JavaScript example
            
            JavaScript's main execution thread generally executes JavaScript code **one piece at a time**.
            
            However, it can manage many asynchronous operations concurrently:
            
            ```jsx
            fetch("/users");
            fetch("/posts");
            fetch("/comments");
            ```
            
            These operations can be in progress together.
            
            That's **concurrency**.
            
            Actual CPU work can be parallelized using mechanisms such as:
            
            - Web Workers in browsers.
            - Worker Threads in Node.js.
            - Multiple processes.
            
            ### Easy memory
            
            > **Concurrency = many tasks in progress.**
            > 
            > 
            > **Parallelism = many tasks executing simultaneously.**
            > 
        - What is AJAX?
            
            AJAX stands for:
            
            > **Asynchronous JavaScript and XML**
            > 
            
            The name is old because modern applications usually use **JSON instead of XML**.
            
            The important idea is:
            
            > JavaScript can communicate with a server **without reloading the entire webpage**.
            > 
            
            Imagine an old-style website.
            
            You click:
            
            ```
            "Load Profile"
            ```
            
            The entire webpage might reload.
            
            With AJAX:
            
            ```
            User clicks
                 ↓
            JavaScript sends request
                 ↓
            Server responds
                 ↓
            JavaScript updates part of page
            ```
            
            The rest of the page stays where it is.
            
            Today, AJAX is commonly implemented using:
            
            ```jsx
            fetch()
            ```
            
            For example:
            
            ```jsx
            const response = await fetch("/api/users");
            const users = await response.json();
            ```
            
            ### Easy memory
            
            > **AJAX = communicating with the server without refreshing the whole page.**
            > 
        - How does hoisting relate to the execution context?
            
            To understand this, first understand **execution context**.
            
            An execution context is basically the environment JavaScript creates to **run your code**.
            
            When JavaScript runs a function, for example:
            
            ```jsx
            function greet() {
              const name = "Elvis";
              console.log(name);
            }
            ```
            
            JavaScript needs an environment containing things such as:
            
            - Variables.
            - Functions.
            - The current scope.
            - Other information needed to execute the code.
            
            Before JavaScript executes the code, it prepares parts of this environment.
            
            This is where **hoisting** comes in.
            
            Hoisting is the behavior where certain declarations are processed during the creation/setup phase of an execution context.
            
            For example:
            
            ```jsx
            sayHello();
            
            function sayHello() {
              console.log("Hello");
            }
            ```
            
            This works because the function declaration is available when the execution context is prepared.
            
            ---
            
            ## `var`
            
            Consider:
            
            ```jsx
            console.log(x);
            
            var x = 10;
            ```
            
            This doesn't behave as if `x` simply didn't exist.
            
            Conceptually, JavaScript prepares it roughly like:
            
            ```jsx
            var x;
            console.log(x); // undefined
            x = 10;
            ```
            
            So `var` is hoisted and initialized with `undefined`.
            
            ---
            
            ## `let` and `const`
            
            They are also processed during setup, but they cannot be accessed before their declaration.
            
            ```jsx
            console.log(x);
            let x = 10;
            ```
            
            This causes an error because `x` is in the **Temporal Dead Zone (TDZ)**.
            
            ### Easy memory
            
            > **Execution context is prepared first.**
            > 
            > 
            > **Hoisting is part of how declarations are handled during that preparation.**
            > 
        - What is event-driven programming?
            
            Event-driven programming means:
            
            > **The program waits for events and responds when they happen.**
            > 
            
            An event could be:
            
            - A button click.
            - A keyboard press.
            - A network response.
            - A timer finishing.
            - A file becoming available.
            - A message arriving.
            
            For example:
            
            ```jsx
            button.addEventListener("click", () => {
              console.log("Button clicked!");
            });
            ```
            
            You're basically telling JavaScript:
            
            > "When this event happens, run this function."
            > 
            
            The function is called an **event handler** or callback.
            
            The basic model is:
            
            ```
            Something happens
                   ↓
            Event is generated
                   ↓
            JavaScript notices it
                   ↓
            Handler runs
            ```
            
            This is a major part of how JavaScript applications work.
            
            ### Easy memory
            
            > **Event-driven = wait for something to happen, then respond.**
            > 
        - How does closure relate to the execution context?
            
            This is one of the most important JavaScript concepts.
            
            Consider:
            
            ```jsx
            function outer() {
              const name = "Elvis";
            
              function inner() {
                console.log(name);
              }
            
              return inner;
            }
            
            const fn = outer();
            
            fn();
            ```
            
            You might ask:
            
            > "How can `fn()` still access `name` when `outer()` has already finished?"
            > 
            
            That's because of a **closure**.
            
            A closure happens when a function **remembers variables from its surrounding scope**.
            
            When `outer()` runs, it creates an execution context.
            
            Inside it:
            
            ```jsx
            const name = "Elvis";
            ```
            
            Then `inner` is created.
            
            `inner` uses `name`, so it maintains access to that surrounding environment.
            
            Even after `outer()` finishes:
            
            ```
            outer()
              ↓
            creates name
              ↓
            creates inner
              ↓
            returns inner
              ↓
            outer finishes
              ↓
            inner still remembers name
            ```
            
            That's a closure.
            
            ### Easy memory
            
            > **Closure = a function remembering the variables around where it was created.**
            > 
            
            Closures are heavily used for:
            
            - Data privacy.
            - Callbacks.
            - Event handlers.
            - Function factories.
            - React and other JavaScript frameworks.
        - How can callbacks lead to race conditions and how do you prevent them?
            
            A **race condition** happens when the result of a program depends on **which asynchronous operation finishes first**.
            
            Imagine:
            
            ```jsx
            let data = null;
            
            getUserData(user => {
              data = user;
            });
            
            getSettings(settings => {
              data = settings;
            });
            ```
            
            Both operations happen asynchronously.
            
            We don't necessarily know which finishes first.
            
            Maybe:
            
            ```
            getUserData → finishes first
            getSettings → finishes second
            ```
            
            Then:
            
            ```jsx
            data = user
            data = settings
            ```
            
            The final value is settings.
            
            But perhaps another time:
            
            ```
            getSettings → finishes first
            getUserData → finishes second
            ```
            
            Now:
            
            ```jsx
            data = settings
            data = user
            ```
            
            The final value is user.
            
            The program's result depends on **timing**.
            
            That's a race condition.
            
            ---
            
            ## How do we prevent race conditions?
            
            One major solution is to control the order using Promises and `async/await`.
            
            Instead of allowing operations to randomly modify shared data:
            
            ```jsx
            const user = await getUserData();
            const settings = await getSettings();
            ```
            
            Now the order is explicit.
            
            Other techniques include:
            
            - Avoiding shared mutable state.
            - Making operations independent.
            - Controlling access to shared resources.
            - Using queues.
            - Using locks where appropriate.
            - Using Promise coordination such as `Promise.all()` when operations can safely run concurrently.
            
            ### Easy memory
            
            > **Race condition = timing changes the result.**
            > 
            > 
            > **Prevent it = control the order or control access to shared data.**
            > 
        - What are some strategies for handling large numbers of concurrent Promises to avoid overloading the event loop?
            
            Imagine doing this:
            
            ```jsx
            const promises = [];
            
            for (let i = 0; i < 1_000_000; i++) {
              promises.push(fetchSomething(i));
            }
            
            await Promise.all(promises);
            ```
            
            You could create an enormous number of operations at once.
            
            This can cause problems such as:
            
            - Too much memory usage.
            - Too many network requests.
            - Too many callbacks/microtasks.
            - Too much work for the system.
            - Overloaded servers.
            - Slow application performance.
            
            The solution is usually **not to start everything at once**.
            
            ---
            
            ## Strategy 1: Limit concurrency
            
            Instead of:
            
            ```
            1000 tasks → start immediately
            ```
            
            do:
            
            ```
            10 tasks
            ↓
            wait for some to finish
            ↓
            start more
            ↓
            continue
            ```
            
            For example, only allow 10 requests to run simultaneously.
            
            ---
            
            ## Strategy 2: Process in batches
            
            Instead of processing 1,000 items at once:
            
            ```
            1,000 items
            ```
            
            process:
            
            ```
            100
            ↓
            100
            ↓
            100
            ↓
            ...
            ```
            
            This controls resource usage.
            
            ---
            
            ## Strategy 3: Use a queue
            
            Put tasks into a queue:
            
            ```
            Task 1
            Task 2
            Task 3
            Task 4
            Task 5
            ...
            ```
            
            Workers take tasks from the queue at a controlled rate.
            
            This is useful when tasks continuously arrive.
            
            ---
            
            ## Strategy 4: Use backpressure
            
            **Backpressure** means:
            
            > When the consumer cannot keep up, slow down the producer.
            > 
            
            Imagine a machine producing:
            
            ```
            100 items/second
            ```
            
            but another machine can process only:
            
            ```
            10 items/second
            ```
            
            If you continue producing 100 per second, items will pile up.
            
            Backpressure tells the producer:
            
            > "Slow down. I can't process everything you're sending me."
            > 
            
            This is particularly important with **streams**.
            
        - The big picture
            
            All of these concepts connect to one major idea:
            
            ```
            JavaScript
                │
                ├── Execution Context
                │      ├── Hoisting
                │      └── Closures
                │
                ├── Event-Driven Programming
                │      └── Events → Callbacks
                │
                ├── Asynchronous Programming
                │      ├── Promises
                │      ├── Thenables
                │      ├── async/await
                │      ├── Async Iterators
                │      └── Async Generators
                │
                ├── Error Handling
                │      ├── try/catch
                │      └── catch chains
                │
                └── Concurrency
                       ├── Race Conditions
                       ├── Concurrency Limits
                       ├── Queues
                       ├── Batching
                       └── Backpressure
            ```
            
            ### The most important things to memorize
            
            | Concept | Simplest meaning |
            | --- | --- |
            | **Thenable** | Anything with `.then()` |
            | **Promise** | Represents a future result |
            | **Async iterator** | Produces values asynchronously, one at a time |
            | **Async generator** | Function that creates an async iterator |
            | **`for await...of`** | Loops through async values |
            | **`try/catch` + `await`** | Catches rejected Promises |
            | **Concurrency** | Many tasks in progress |
            | **Parallelism** | Many tasks executing at once |
            | **AJAX** | Communicating with a server without reloading the page |
            | **Hoisting** | Declarations are prepared before execution |
            | **Event-driven** | Responding to events |
            | **Closure** | Function remembers its outer variables |
            | **Race condition** | Timing changes the result |
            | **Concurrency limit** | Restrict how many tasks run at once |
            | **Backpressure** | Slow the producer when the consumer can't keep up |

> By Elvis Manzi
>