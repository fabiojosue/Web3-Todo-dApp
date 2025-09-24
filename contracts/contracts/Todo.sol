// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Todo {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);

    function createTask(string memory _content) external {
        taskCount++;
        tasks[taskCount] = Task({ id: taskCount, content: _content, completed: false });
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint256 _id) external {
        Task storage t = tasks[_id];
        t.completed = !t.completed;
        emit TaskCompleted(_id, t.completed);
    }
}
